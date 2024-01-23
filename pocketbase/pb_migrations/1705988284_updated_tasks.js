/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fqw0p74gvywpw13")

  collection.createRule = "owner.id = @request.auth.id && completed = false"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fqw0p74gvywpw13")

  collection.createRule = "owner.id = @request.auth.id"

  return dao.saveCollection(collection)
})
