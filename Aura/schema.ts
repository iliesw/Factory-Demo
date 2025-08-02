import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";


export const Stock = sqliteTable("Stock", {
  Id: integer("Id").primaryKey(),
  Name: text("Name"),
  Referance: integer("Referance"),
  Description: text("Description"),
  Image: text("Image"),
  Quantity: integer("Quantity"),
});