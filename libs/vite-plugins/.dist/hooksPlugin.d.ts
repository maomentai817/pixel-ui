export default function hooksPlugin({ rmFiles, beforeBuild, afterBuild }: {
    rmFiles?: string[];
    beforeBuild?: Function;
    afterBuild?: Function;
}): {
    name: string;
    buildStart(): void;
    buildEnd(err?: Error): void;
};
