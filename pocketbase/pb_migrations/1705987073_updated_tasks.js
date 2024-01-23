/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fqw0p74gvywpw13")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z3xfzsfq",
    "name": "owner",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fqw0p74gvywpw13")

  // remove
  collection.schema.removeField("z3xfzsfq")

  return dao.saveCollection(collection)
})
