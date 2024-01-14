import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { ContentModule } from 'src/content/content.module';
import { LearningProgressModule } from 'src/learnprogress/learningprogress.module';
import { LoggerModule } from 'src/logger/logger.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './middleware/auth.middleware';
import { FirebaseAuthService } from './services/firebase.service';
import { FileUploadModule } from 'src/upload/file-upload.module';

@Module({
  imports: [
    ContentModule,
    ConfigModule,
    LoggerModule,
    LearningProgressModule,
    FileUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseAuthService],
  exports: [FirebaseAuthService],
})
// export class AppModule {}
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: '/test', method: RequestMethod.ALL })
      .forRoutes({ path: '/*', method: RequestMethod.ALL });
    //or `excludeRoutes`
  }
}
