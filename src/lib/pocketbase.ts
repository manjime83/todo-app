import PocketBase from "pocketbase";
import { TypedPocketBase } from "./pocketbase-types";

const pb = new PocketBase() as TypedPocketBase;

export default pb;
