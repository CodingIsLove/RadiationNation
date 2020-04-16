import * as shell from "shelljs"

// Copy all the Image resources
shell.cp("-R", 'src/public',"dist/");
