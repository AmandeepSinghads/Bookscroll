import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";

describe('App e2e', ()=>{// before all we create a module that will import all modules to be tested
    let app : INestApplication;
    beforeAll(async()=>{
        
        const moduleRef = await Test.createTestingModule({
            imports:[AppModule],
        }).compile();
         app = moduleRef.createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist:true,
            }),
        );
        // this to start the server
        await app.init();
    });

    afterAll(async() =>{
        await app.close();
    })
    it.todo('should pass');
});