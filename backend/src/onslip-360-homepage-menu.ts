import { SysConsole } from '@divine/sysconsole';
import { URI } from '@divine/uri';
import { WebServer } from '@divine/web-service';
import { API, nodeRequestHandler } from '@onslip/onslip-360-node-api';
import { execSync } from 'child_process';
import { program } from 'commander';
import { writeFile } from 'fs/promises';
import pkg from '../package.json';
import { DHMService } from './dhm-service';
import { validate } from './schema';

import '@divine/uri-postgres-protocol'
import { stringify } from 'querystring';

SysConsole.replaceConsole({ title: pkg.name, showFile: false, showLine: false, syslogMsgId: true },
                          { depth: null, maxArrayLength: null, colors: true });

API.initialize(nodeRequestHandler({ userAgent: `${pkg.name}/${pkg.version}` }));

export async function main(_prog: string, ..._args: string[]): Promise<void> {
    const cmd = program
        .name(pkg.name)
        .description(pkg.description)
        .version(pkg.version)
        .option('    --config <file>',   'Read configuration from this file')
        .option('    --pidfile <file>',  'Fork and write PID to this file')
        .option('    --user <user>',     'Run as this user')
        .parse(process.argv);

    const argv = cmd.opts();

    function check(cond: boolean, message: string) {
        if (!cond) {
            process.stderr.write(`${cmd.helpInformation()}\nArgument error: ${message}\n`);
            process.exit(64);
        }
    }

    check(!!argv.config, '--config is required');

    const config = validate('DHMConfig', await new URI(argv.config).load());
    const dhnsvc = await new DHMService(config).initialize();
    const websvc = await new WebServer(config.listen.host, config.listen.port, dhnsvc.asWebService()).start();

    if (argv.pidfile) {
        require('daemonize-process')();
        await writeFile(argv.pidfile, String(process.pid));
    }

    if (argv.user) {
        process.setgid(Number(execSync(`id -g ${argv.user}`)));
        process.setuid(argv.user);
    }

    try {
        console.info(`${pkg.name} listening on <http://${websvc.addressInfo.address}:${websvc.addressInfo.port}/>.`);
        await websvc.wait();
    } finally {
        console.log(`${pkg.name} stopped`);
    }
}
