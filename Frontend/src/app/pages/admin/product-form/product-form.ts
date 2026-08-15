import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  productForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
    price: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    stock: new FormControl('', [Validators.required]),
  });

  selectedFile: File | null = null;
  productId: string | null = null;
  isEditMode = false;
  errorMessage = signal('');

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.productId;

    if (this.isEditMode) {
      this.productService.getProductByID(this.productId).subscribe((response) => {
        const product = response.product;
        this.productForm.patchValue({
          title: product.title,
          desc: product.desc,
          price: product.price,
          stock: product.stock,
        });
      });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set('');

    if (this.isEditMode) {
      this.productService.updateProduct(this.productId!, this.productForm.value).subscribe({
        next: () => this.router.navigate(['/admin/products']),
        error: (err) => this.errorMessage.set(err.error?.message ?? 'Update failed'),
      });
      return;
    }

    const formData = new FormData();
    Object.entries(this.productForm.value).forEach(([key, value]) => formData.append(key, String(value)));
    if (this.selectedFile) {
      formData.append('imageURL', this.selectedFile);
    }

    this.productService.createProduct(formData).subscribe({
      next: () => this.router.navigate(['/admin/products']),
      error: (err) => this.errorMessage.set(err.error?.ErrMessage ?? 'Create failed'),
    });
  }
}
