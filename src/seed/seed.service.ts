import { Injectable } from '@nestjs/common';
import { ProductsService } from './../products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {

  constructor(
    private readonly productsService: ProductsService
  ) {}

async runSeed() {

    await this.deleteAllTables();
    await this.insertNewProducts();

    return 'Seed executed';
  }
  
private async deleteAllTables() {
    await this.productsService.deleteAllProducts();
    return true;
}

private async insertNewProducts() {

    const products = initialData.products;

    const insertPromises = [];

    products.forEach(product => {
      insertPromises.push(this.productsService.create(product));
    });

    await Promise.all(insertPromises);

    return true;
  }

}
