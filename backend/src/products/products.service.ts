import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class ProductsService {
  private readonly baseUrl: string = process.env.API_URL;

  async getAllProducts(limit: number = 30, skip: number = 0) {
    const response = await fetch(`${this.baseUrl}?limit=${limit}&skip=${skip}`);
    return response.json();
  }

  async getProductById(id: number) {
    const response = await fetch(`${this.baseUrl}/${id}`);
    return response.json();
  }

  async searchProducts(query: string) {
    const response = await fetch(`${this.baseUrl}/search?q=${query}`);
    return response.json();
  }

  async getProductsWithPagination(limit: number, skip: number, select: string) {
    const response = await fetch(
      `${this.baseUrl}?limit=${limit}&skip=${skip}&select=${select}`,
    );
    return response.json();
  }

  async sortProducts(sortBy: string, order: 'asc' | 'desc') {
    const response = await fetch(
      `${this.baseUrl}?sortBy=${sortBy}&order=${order}`,
    );
    return response.json();
  }

  async getAllCategories() {
    const response = await fetch(`${this.baseUrl}/categories`);
    return response.json();
  }

  async getCategoryList() {
    const response = await fetch(`${this.baseUrl}/category-list`);
    return response.json();
  }

  async getProductsByCategory(category: string) {
    const response = await fetch(`${this.baseUrl}/category/${category}`);
    return response.json();
  }

  async addProduct(product: any) {
    const response = await fetch(`${this.baseUrl}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    return response.json();
  }

  async updateProduct(id: number, product: any) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    return response.json();
  }

  async deleteProduct(id: number) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  }
}
