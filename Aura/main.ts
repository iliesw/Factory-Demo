import { Aura } from "@iliesw/aura";
import * as Tables from "./schema";
import Func from "./.generated/functions";
import config from "./config";
export const AURA = Aura.Connect(config.URL,Tables, Func);