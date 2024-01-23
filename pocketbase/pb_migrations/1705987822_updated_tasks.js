/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fqw0p74gvywpw13")

  collection.listRule = "owner.id = @request.auth.id"
  collection.viewRule = "owner.id = @request.auth.id"
  collection.createRule = "owner.id = @request.auth.id"
  collection.updateRule = "owner.id = @request.auth.id"
  collection.deleteRule = "owner.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fqw0p74gvywpw13")

  collection.listRule = "@request.data.owner.id = @request.auth.id"
  collection.viewRule = "@request.data.owner.id = @request.auth.id"
  collection.createRule = "@request.data.owner = @request.auth.id"
  collection.updateRule = "@request.data.owner = @request.auth.id"
  collection.deleteRule = "@request.data.owner.id = @request.auth.id"

  return dao.saveCollection(collection)
})
