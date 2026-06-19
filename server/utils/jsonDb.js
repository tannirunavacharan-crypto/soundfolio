const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DATA_DIR = path.join(__dirname, '..', 'data');

class JsonModel {
  constructor(modelName, schemaFields = {}) {
    this.modelName = modelName;
    this.filename = `${modelName.toLowerCase()}s.json`;
    this.filepath = path.join(DATA_DIR, this.filename);
    this.schemaFields = schemaFields;
    
    // Ensure data directory and file exist
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(this.filepath)) {
      fs.writeFileSync(this.filepath, JSON.stringify([], null, 2));
    }
  }

  _read() {
    try {
      const content = fs.readFileSync(this.filepath, 'utf8');
      return JSON.parse(content);
    } catch (err) {
      console.error(`Error reading database file ${this.filename}:`, err);
      return [];
    }
  }

  _write(data) {
    try {
      fs.writeFileSync(this.filepath, JSON.stringify(data, null, 2));
      return true;
    } catch (err) {
      console.error(`Error writing database file ${this.filename}:`, err);
      return false;
    }
  }

  _wrapDoc(doc) {
    if (!doc) return null;
    
    // Return document instance with Mongoose helper methods
    const instance = { ...doc };
    
    // deleteOne method
    instance.deleteOne = async () => {
      let items = this._read();
      items = items.filter((item) => item._id !== doc._id);
      this._write(items);
      return { success: true };
    };

    // matchPassword helper (only for User model)
    if (this.modelName === 'User') {
      instance.matchPassword = async function (enteredPassword) {
        // Since we select password, it's inside doc.password
        return await bcrypt.compare(enteredPassword, doc.password);
      };
    }

    return instance;
  }

  // CREATE
  async create(data) {
    const items = this._read();
    
    const createSingle = async (singleData) => {
      let finalData = { ...singleData };
      if (this.modelName === 'User' && finalData.password) {
        const salt = await bcrypt.genSalt(10);
        finalData.password = await bcrypt.hash(finalData.password, salt);
      }
      return {
        _id: Date.now().toString() + Math.random().toString(36).substring(2, 6),
        ...finalData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    };

    if (Array.isArray(data)) {
      const newDocs = [];
      for (const item of data) {
        // Delay slightly to prevent identical IDs if seeded at the exact millisecond
        await new Promise((resolve) => setTimeout(resolve, 1));
        const doc = await createSingle(item);
        newDocs.push(doc);
      }
      items.push(...newDocs);
      this._write(items);
      return newDocs.map(doc => this._wrapDoc(doc));
    } else {
      const newDoc = await createSingle(data);
      items.push(newDoc);
      this._write(items);
      return this._wrapDoc(newDoc);
    }
  }

  // FIND
  find(query = {}) {
    const items = this._read();
    
    // Filter records matching query
    let filtered = items.filter((item) => {
      for (let key in query) {
        // Support category matching
        if (key === 'category' && query[key] !== item.category) return false;
        
        // Support year matching
        if (key === 'year' && parseInt(query[key]) !== item.year) return false;
        
        // Support text search query regex
        if (query[key] && typeof query[key] === 'object' && query[key].$regex) {
          const searchVal = query[key].$regex.toLowerCase();
          const itemVal = (item[key] || '').toLowerCase();
          if (!itemVal.includes(searchVal)) return false;
        }
      }
      return true;
    });

    // Emulate thenable and sort chain
    const resultObj = {
      sort: (sortFields) => {
        filtered.sort((a, b) => {
          for (let key in sortFields) {
            const order = sortFields[key]; // 1 or -1
            let valA = a[key];
            let valB = b[key];
            
            // Handle dates
            if (key === 'createdAt' || key === 'updatedAt') {
              valA = new Date(valA);
              valB = new Date(valB);
            }
            
            if (valA < valB) return order === -1 ? 1 : -1;
            if (valA > valB) return order === -1 ? -1 : 1;
          }
          return 0;
        });

        // Wrap results
        const wrapped = filtered.map(item => this._wrapDoc(item));
        return Promise.resolve(wrapped);
      },
      then: (resolve) => {
        const wrapped = filtered.map(item => this._wrapDoc(item));
        resolve(wrapped);
      }
    };

    return resultObj;
  }

  // FIND ONE
  findOne(query = {}) {
    const items = this._read();
    const found = items.find((item) => {
      for (let key in query) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    });

    const resultObj = {
      select: (fieldsStr) => {
        // select('+password') or select('-password')
        return Promise.resolve(this._wrapDoc(found));
      },
      then: (resolve) => {
        resolve(this._wrapDoc(found));
      }
    };

    return resultObj;
  }

  // FIND BY ID
  findById(id) {
    const items = this._read();
    const found = items.find((item) => item._id === id);

    const resultObj = {
      select: (fieldsStr) => {
        return Promise.resolve(this._wrapDoc(found));
      },
      then: (resolve) => {
        resolve(this._wrapDoc(found));
      }
    };

    return resultObj;
  }

  // FIND BY ID AND UPDATE
  async findByIdAndUpdate(id, updateData, options = {}) {
    const items = this._read();
    const index = items.findIndex((item) => item._id === id);
    if (index === -1) return null;

    // Encrypt password if updating user password
    let finalUpdate = { ...updateData };
    if (this.modelName === 'User' && finalUpdate.password) {
      const salt = await bcrypt.genSalt(10);
      finalUpdate.password = await bcrypt.hash(finalUpdate.password, salt);
    }

    const updatedDoc = {
      ...items[index],
      ...finalUpdate,
      updatedAt: new Date().toISOString(),
    };

    items[index] = updatedDoc;
    this._write(items);
    return this._wrapDoc(updatedDoc);
  }

  // DELETE MANY (Seeder use case)
  async deleteMany() {
    this._write([]);
    return { deletedCount: 0 };
  }
}

module.exports = JsonModel;
