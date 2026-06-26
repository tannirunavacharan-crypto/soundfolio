const bcrypt = require('bcryptjs');

class FirebaseModel {
  constructor(modelName) {
    this.modelName = modelName;
    // Firestore collections are pluralized lowercase, e.g. "users", "tracks", "services", "projects", "testimonials", "inquiries"
    this.collectionName = `${modelName.toLowerCase()}s`;
  }

  get db() {
    return global.firestoreDb;
  }

  _wrapDoc(doc) {
    if (!doc) return null;

    const instance = { ...doc };

    // deleteOne method
    instance.deleteOne = async () => {
      const docRef = this.db.collection(this.collectionName).doc(doc._id);
      await docRef.delete();
      return { success: true };
    };

    // matchPassword helper (only for User model)
    if (this.modelName === 'User') {
      instance.matchPassword = async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, doc.password);
      };
    }

    return instance;
  }

  // CREATE
  async create(data) {
    const collectionRef = this.db.collection(this.collectionName);

    const createSingle = async (singleData) => {
      let finalData = { ...singleData };
      if (this.modelName === 'User' && finalData.password) {
        const salt = await bcrypt.genSalt(10);
        finalData.password = await bcrypt.hash(finalData.password, salt);
      }

      const docRef = collectionRef.doc();
      const id = docRef.id;
      const docData = {
        _id: id,
        ...finalData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await docRef.set(docData);
      return docData;
    };

    if (Array.isArray(data)) {
      const newDocs = [];
      for (const item of data) {
        const doc = await createSingle(item);
        newDocs.push(doc);
      }
      return newDocs.map(doc => this._wrapDoc(doc));
    } else {
      const newDoc = await createSingle(data);
      return this._wrapDoc(newDoc);
    }
  }

  // FIND
  find(query = {}) {
    const executeQuery = async () => {
      const snapshot = await this.db.collection(this.collectionName).get();
      let docs = [];
      snapshot.forEach(doc => docs.push(doc.data()));

      // Filter in-memory for complete flexibility and identical behavior to JSON db
      let filtered = docs.filter((item) => {
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
          } else if (query[key] !== undefined && query[key] !== item[key]) {
            return false;
          }
        }
        return true;
      });

      return filtered;
    };

    const resultObj = {
      sort: (sortFields) => {
        return executeQuery().then((filtered) => {
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

          return filtered.map(item => this._wrapDoc(item));
        });
      },
      then: (resolve) => {
        return executeQuery().then((filtered) => {
          resolve(filtered.map(item => this._wrapDoc(item)));
        });
      }
    };

    return resultObj;
  }

  // FIND ONE
  findOne(query = {}) {
    const executeQuery = async () => {
      const snapshot = await this.db.collection(this.collectionName).get();
      let docs = [];
      snapshot.forEach(doc => docs.push(doc.data()));

      const found = docs.find((item) => {
        for (let key in query) {
          if (item[key] !== query[key]) return false;
        }
        return true;
      });

      return found;
    };

    const resultObj = {
      select: (fieldsStr) => {
        return executeQuery().then((found) => this._wrapDoc(found));
      },
      then: (resolve) => {
        return executeQuery().then((found) => resolve(this._wrapDoc(found)));
      }
    };

    return resultObj;
  }

  // FIND BY ID
  findById(id) {
    const executeQuery = async () => {
      if (!id) return null;
      const docRef = this.db.collection(this.collectionName).doc(id);
      const doc = await docRef.get();
      return doc.exists ? doc.data() : null;
    };

    const resultObj = {
      select: (fieldsStr) => {
        return executeQuery().then((found) => this._wrapDoc(found));
      },
      then: (resolve) => {
        return executeQuery().then((found) => resolve(this._wrapDoc(found)));
      }
    };

    return resultObj;
  }

  // FIND BY ID AND UPDATE
  async findByIdAndUpdate(id, updateData, options = {}) {
    if (!id) return null;
    const docRef = this.db.collection(this.collectionName).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return null;

    let finalUpdate = { ...updateData };
    if (this.modelName === 'User' && finalUpdate.password) {
      const salt = await bcrypt.genSalt(10);
      finalUpdate.password = await bcrypt.hash(finalUpdate.password, salt);
    }

    const updatedDoc = {
      ...doc.data(),
      ...finalUpdate,
      updatedAt: new Date().toISOString(),
    };

    await docRef.set(updatedDoc);
    return this._wrapDoc(updatedDoc);
  }

  // DELETE MANY (Seeder use case)
  async deleteMany() {
    const collectionRef = this.db.collection(this.collectionName);
    const snapshot = await collectionRef.get();

    const batch = this.db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    return { deletedCount: snapshot.size };
  }
}

module.exports = FirebaseModel;
