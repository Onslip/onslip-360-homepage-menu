import { WebError, WebStatus } from '@divine/web-service';
import Ajv, { ValidateFunction } from 'ajv';
import schema from './schema.json';

export interface DHMConfig {
    listen: {
        host: string;
        port: number;
    },

    database: {
        uri: string;
    }

    onslip360: {
        base: string;
        realm: string;
        id: string;
        key: string;
    }
}

interface Definitions {
    DHMConfig: DHMConfig;
}

const ajv = new Ajv({
    allErrors: true,
    schemas: [schema],
});

const validators: { [K in keyof Definitions]?: ValidateFunction } = {}

export function validate<K extends keyof Definitions>(type: K, object: Definitions[K]): Definitions[K] {
    const validate = validators[type] ?? (validators[type] = ajv.getSchema(`#/definitions/${type}`)!);

    if (!validate) {
        throw new TypeError(`Invalid schema type ${type}`);
    }
    else if (validate(object) !== true) {
        const error = { dataPath: '', message: 'Unknown validation error', ...validate.errors?.[0] };

        throw new WebError(WebStatus.UNPROCESSABLE_ENTITY, `#${error.dataPath}: ${error.message}`);
    }
    else {
        return object;
    }
}
