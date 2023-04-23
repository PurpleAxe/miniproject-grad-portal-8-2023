import { Tree, formatFiles, 
        generateFiles, 
        joinPathFragments, 
        names } from '@nrwl/devkit';
// import { libraryGenerator } from '@nrwl/workspace/generators';
import { libraryGenerator } from '@nrwl/nest';
import fs from 'fs';
export default async function (tree: Tree, schema: any) {
  
  const options=     {...schema,
    ...names(schema.name),
    tmpl:'',
   } ; // config object to replace variable in file templates
  
  if(options.type=== 'api'||options.type=== 'app'){
    await generateLibrary(tree,'data-access',options); 
    await generateLibrary(tree,'feature',options); 
    await generateLibrary(tree,'util',options); 
    
    generateFiles(
      tree, // the virtual file system
      joinPathFragments(__dirname, './files',options.type), // path to the file templates
      joinPathFragments('/libs',options.type,options.fileName), // destination path of the files
      options
    );

    await formatFiles(tree);
  }
  else{
    if(options.type=== 'command' && options.command!== '' ){
      const secondOptions= {
     collectionName:   {...names(schema.name)},
    ...names(schema.command),
    tmpl:'',
      }
      generateFiles(
        tree, // the virtual file system
        joinPathFragments(__dirname, './files',options.type), // path to the file templates
        joinPathFragments('/libs/api',options.fileName), // destination path of the files
        secondOptions
      );
    
      
      const paths= [
      joinPathFragments('/libs/api',options.fileName,'feature/src/commands'),
      joinPathFragments('/libs/api',options.fileName,'feature/src/events'),
      joinPathFragments('/libs/api',options.fileName,'util/src/commands'),
      joinPathFragments('/libs/api',options.fileName,'util/src/events'),
      joinPathFragments('/libs/api',options.fileName,'util/src/requests'),
      joinPathFragments('/libs/api',options.fileName,'util/src/responses'),
    ]
      const postfixs= [
        '.handler','-event.handler','.commands','.event','.request','.response'
      ]
      console.log(paths);
      await paths.forEach(async function (path,index) {
        var dataToAdd= `export * from './${secondOptions.fileName}${postfixs[index]}';`;
        console.log(joinPathFragments(path,'index.ts'));
        await fs.appendFile(joinPathFragments(path,'index.ts'),dataToAdd , function (err) {
          if (err) console.log(err);
          console.log(`UPDATED: ${joinPathFragments(path,'index.ts')} `);
        });

      });

    }
    else{
      console.log('\x1b[31m%s\x1b[0m','Generation failed with error:'); 
    }
  }
}
async function generateLibrary(
  tree: Tree, libName: string,options:any) {

  await libraryGenerator(tree, { name: libName, buildable: true, standaloneConfig: true, 
  directory:  joinPathFragments(options.type,options.fileName) });
  tree.delete(joinPathFragments('/libs',options.type,options.fileName, libName,'src/lib'));
}

