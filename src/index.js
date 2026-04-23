import * as core from "@actions/core";

function runTool(target, mode) {
  if (!target || !mode) {
    throw new Error("target and mode are required");
  }

  const supportedModes = ["scan", "validate", "report"];
  if (!supportedModes.includes(mode)) {
    throw new Error(`unsupported mode: ${mode}`);
  }

  const result = {
    target,
    mode,
    status: "success",
    timestamp: new Date().toISOString(),
  };

  const summary = `[PoC] ${target} executed in ${mode} mode`;

  return { result, summary };
}

try {
  const target = core.getInput("target");
  const mode = core.getInput("mode");

  core.info(`Starting plugin runner`);
  core.info(`target=${target}`);
  core.info(`mode=${mode}`);

  const { result, summary } = runTool(target, mode);

  core.setOutput("result", JSON.stringify(result));
  core.setOutput("summary", summary);

  core.info(`Execution completed`);
  core.info(summary);
} catch (error) {
  core.setFailed(error.message);
}