/**
 * storage.js
 *
 * Exports a singleton Storage instance which reads from and writes to
 * localStorage, if it's available, or just pretends to do so if it's
 * not.
 */



/**
 * If window.localStorage is not available, an instance of the
 * CustomStorage class will be used instead. No data will be saved
 * to the user's hard drive, and no errors will occur.
 *
 * @class      CustomStorage (name)
 */
 class CustomStorage{
  constructor() {
    this.storage = {}
  }

  // Called by _save() in Storage instance
  setItem(key, value) {
    this.storage[key] = value
  }
}



class Storage{
  constructor() {
    /// <<< HARD-CODED
    this.id = "secure-login"
    /// HARD-CODED >>>

    this.stored = false // let's be pessimistic

    try {
      this.storage = window.localStorage
      this.settings = JSON.parse(this.storage.getItem(this.id))
      // may be null
      this.stored = true // we can be optimistic now

    } catch(error) {
      this.storage = new CustomStorage()
    }

    if (!this.settings || typeof this.settings !== "object") {
      this.settings = {}
    }
  }


  setItem(key, value) {
    this.settings[key] = value
    this._save()
    return this.stored // false for a simulation
  }


  set(settings) {
    Object.assign(this.settings, settings)
    this._save()
    return this.stored // false for a simulation
  }


  getItem(key) {
    return this.settings[key]
  }


  get(key) {
    return Object.assign({}, this.settings)
  }


  restore(settings) {
    Object.assign(settings, this.settings)
  }


  _save() {
    const string = JSON.stringify(this.settings)
    this.storage.setItem(this.id, string)
  }
}



export default new Storage()