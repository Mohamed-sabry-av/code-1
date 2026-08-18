import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../services/product';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm implements OnInit {
  @Input() product: Product | null = null;

  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  errorMessage = signal('');

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    if (this.product) {
      this.productForm.patchValue(this.product);
    }
  }

  productForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    desc: new FormControl<string | null>('', [Validators.required]),
    stock: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    imageURL: new FormControl(''),
  });

  onSubmit() {
    this.errorMessage.set('');

    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.errorMessage.set('Please complete all required fields with valid values.');
      return;
    }
    const id = this.product?._id;

    const formValue = this.productForm.value as Product;

    const request = id
      ? this.productService.updateProduct(id, formValue)
      : this.productService.createProduct(formValue);
    request.subscribe({
      next: () => this.saved.emit(),
      error: (error) => {
        console.error('Failed to save product', error);
        this.errorMessage.set(error.error?.message ?? 'Failed to save product');
      },
    });
  }
}
