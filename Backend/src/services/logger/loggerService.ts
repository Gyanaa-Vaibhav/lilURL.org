import {LoggerCreator} from './loggerCreator.js'

const loggerCreator = new LoggerCreator()

export function logError(message:any) {
    loggerCreator.getErrorLogger().error(message)
}

export function logWarn(message:any){
    loggerCreator.getWarnLogger().warn(message)
}

export function logInfo(message:any) {
    loggerCreator.getInfoLogger().info(message);
}

export function logHttp(message:any) {
    loggerCreator.getHttpLogger().http(message)
}

export function logVerbose(message:any) {
    loggerCreator.getVerboseLogger().verbose(message)
}

export function logDebug(message:any) {
    loggerCreator.getDebugLogger().debug(message)
}

export function logSilly(message:any) {
    loggerCreator.getSillyLogger().silly(message)
}

logError("Error")
logInfo("Info")
logWarn("Warn")
logHttp("HTTP")
logVerbose("Verbose")
logDebug("Debug")
logSilly("Silly")


logError(new Error("Test Error"))
logError(new Error("Test Error"))