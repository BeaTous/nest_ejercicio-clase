import { BadRequestException, Body, Controller, Delete, Get, Logger, NotFoundException, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from 'src/interface/restaurant.model';
import { Repository } from 'typeorm/repository/Repository';

@Controller('restaurant')
export class RestaurantController {
    private readonly log = new Logger(RestaurantController.name);
    constructor(
        @InjectRepository(Restaurant) private restaurantRepository: Repository<Restaurant>

    ){}

  
@Get()
findAll(){
    this.log.debug('REST request to execute find restaurants')
    return this.restaurantRepository.find();
}
@Get(':id')
async findByID(@Param('id', ParseIntPipe) id: number){
    this.log.debug(`[REST request to find restaurant by id: ${id}`)
if(! await this.restaurantRepository.existsBy({id:id})) {
    this.log.warn(`Restaurant not found with id: ${id}`)
    throw new NotFoundException();
}
return this.restaurantRepository.findOne({
    where:{
        id:id
    }
});

}
@Post()
    async create(@Body() restaurant: Restaurant) {
    if(restaurant.id > 0){
        throw new BadRequestException('no se pude crear un nuevo restaurante con id asignado');
}

try {
    return await this.restaurantRepository.save(restaurant);
    
} catch (error){
    this.log.error(`error intentando crear un nuevo restaurant ${restaurant}`);
    throw new BadRequestException('Restaurante incorrecto, no se ha podido crear.');

}

} 

@Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() restaurant: Restaurant) {
        this.log.debug(`REST request to update restaurant with id ${id}`);

        if(! await this.restaurantRepository.existsBy({id: id})) {
            this.log.warn(`Restaurant not found with id: ${id}`);
            throw new NotFoundException();
        }

        try {
            return await this.restaurantRepository.save(restaurant);
        } catch (error) {
            this.log.error(`Error intentando crear un nuevo restaurant`);
            throw new BadRequestException('Resturante incorrecto, no se ha podido crear.');
        }

    }

    @Delete(':id')
    async deleteById(@Param('id', ParseIntPipe) id: number) {
        this.log.debug(`REST request to delete restaurant with id ${id}`);

        if(! await this.restaurantRepository.existsBy({id: id})) {
            this.log.warn(`Restaurant not found with id: ${id}`);
            throw new NotFoundException();
        }

        this.restaurantRepository.delete({
            id: id
        });
    }

}