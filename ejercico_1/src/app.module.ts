import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './restaurant/restaurant.entity';
import { RestaurantController } from './restaurant/restaurant.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', 
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'ejercicio_1', 
      entities: [Restaurant],
      synchronize: true, 
      logging: true
    }),
    TypeOrmModule.forFeature([Restaurant]) 

  ],
  controllers: [RestaurantController],
  providers: [],
})
export class AppModule {}