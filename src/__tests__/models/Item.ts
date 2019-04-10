import { prop, model } from "../..";
import Parse from "parse";

@model()
export default class Item extends Parse.Object {
    @prop() p: string;
}
