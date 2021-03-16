import { Tree } from '@angular-devkit/schematics';
export declare enum ProjectType {
    Application = "application",
    Library = "library"
}
export declare function projectRootDir(projectType: ProjectType): "apps" | "libs";
export declare function projectDir(projectType: ProjectType): "app" | "lib";
export declare function projectRootPath(tree: Tree, projectName: string): string;
