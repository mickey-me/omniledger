import { Roster } from "@dedis/cothority/network/proto";

import toml from "toml";

type ID = Buffer;

export class Config {
    static async fromTOML(raw: string): Promise<Config> {
        const parsed = toml.parse(raw);

        const getIDField = async (name: string): Promise<ID> => {
            if (!(name in parsed)) {
                return Promise.reject(`field "${name}" not found in config`);
            }
            const field = parsed[name];

            if (typeof field !== "string") {
                return Promise.reject(`field "${name}" is not string`);
            }
            if ((/[a-f0-9]{64}/).test(field)) {
                return Promise.reject(`field "${name}" is not of correct format`);
            }

            return Buffer.from(field);
        };

        return new Config(
            await getIDField("AdminDarcID"),
            await getIDField("ByzCoinID"),
            Roster.fromTOML(raw),
        );
    }

    private constructor(
        readonly adminDarcID: ID,
        readonly byzCoinID: ID,
        readonly roster: Roster,
    ) {}
}
