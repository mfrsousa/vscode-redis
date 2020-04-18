import { commands, ExtensionContext } from 'vscode';
import ServiceManager from './manager/serviceManager';
import DBNode from './node/dbNode';
import KeyNode from './node/keyNode';
import ConnectionNode from './node/connectionNode';

export function activate(context: ExtensionContext) {
    const serviceManager = new ServiceManager(context)
    context.subscriptions.push(
        ...serviceManager.init(),
        commands.registerCommand('redis.connection.add', () => serviceManager.provider.add()),
        commands.registerCommand('redis.connection.delete', (element: ConnectionNode) => serviceManager.provider.delete(element)),
        commands.registerCommand('redis.refresh', () => serviceManager.provider.refresh()),
        commands.registerCommand('redis.key.detail', (element: KeyNode) => serviceManager.panel.show(element)),
        commands.registerCommand('redis.key.add', (element: DBNode) => element.addKey())
    )
}