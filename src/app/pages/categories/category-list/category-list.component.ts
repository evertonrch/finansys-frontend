import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = []

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories,
      error => alert(`Erro ao carregar as categorias => ${error}`)
    )
  }

  public deleteCategory(category: Category) {
    const mustDelete = confirm("Deseja realmente excluir este item?")
    if(mustDelete) {
      this.categoryService.delete(category.id).subscribe(
        () => this.categories = _.filter(this.categories, (item) => item.id !== category.id),
        () => alert("Erro ao tentar excluir!")
      )
    }
  }
}
