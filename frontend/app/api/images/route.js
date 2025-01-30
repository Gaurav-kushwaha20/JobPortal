import {join} from 'path';
import * as fs from "node:fs";


export async function GET(){
    const imagesPath = join(process.cwd(), 'public/landing-page');
    console.log(imagesPath);
    
    const images =  fs.readdirSync(imagesPath)
    
    return new Response(JSON.stringify(images))
}