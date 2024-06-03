import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CartService } from '../../services/cart.service';
import { MatButtonModule } from '@angular/material/button';
import { PaymentService } from '../../services/payment.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
declare var Razorpay: any;
@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  imports: [
    CommonModule,
    CartItemComponent,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CartComponent implements OnInit {
  //cartCheckOutForm: FormGroup;
  constructor(
    private cartService: CartService,
    private paymentService: PaymentService,
    private fb: FormBuilder
  ) {
    /*  this.cartCheckOutForm = this.fb.group({
      amount: ['', Validators.required],
    }); */
  }
  ngOnInit(): void {
    this.showCartItems();
  }
  cart: any;
  total: number = 0;

  showCartItems() {
    this.cartService.getUSerCart().subscribe({
      next: (result: any) => {
        this.cart = result;
        this.cartCheckOutData.amount = result.totalPrice;
        console.log(result);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  /*  pay() {
    this.paymentService.createOrder(this.orderData).subscribe({
      next: (result: any) => {
        console.log('payment result : ', result);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  } */

  options = {
    key: 'rzp_test_zpQQPOYV4FZ0p0', // Enter the Key ID generated from the Dashboard
    amount: 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: 'INR',
    name: 'Blake Market',
    description: 'Test Transaction',
    image: 'https://example.com/your_logo',
    order_id: '', //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    callback_url: 'https://eneqd3r9zrjok.x.pipedream.net/',
    prefill: {
      name: 'Gaurav Kumar',
      email: 'gaurav.kumar@example.com',
      contact: '9000090000',
    },
    notes: {
      address: 'Razorpay Corporate Office',
    },
    theme: {
      color: '#ff004f',
    },
  };

  cartCheckOutData = {
    amount: 0,
  };
  pay() {
    this.paymentService.createOrder(this.cartCheckOutData).subscribe({
      next: (result: any) => {
        console.log('payment result : ', result);
        this.options.amount = parseFloat(result.amount);
        this.options.order_id = result.id;
        console.log('result.amount:', result.amount);
        console.log('type of result.amount:', typeof result.amount);
        console.log('this.options.amount :', this.options.amount);
        console.log(
          'type of this.options.amount :',
          typeof this.options.amount
        );
        var rzp1 = new Razorpay(this.options);
        rzp1.open();
      },
      error: (error: any) => {
        alert('something went wrong');
        console.log(error);
      },
    });
    //const rzp1 = new Razorpay(this.options);
    //rzp1.open();
  }
}
