import { Component, OnInit } from '@angular/core';
import { WindowRefService } from './services/window-ref.service';
import { RazorpayService } from ".//services/razorpay.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'ng-rpays';
	order_id: any;
	razorpay_payment_id: any;

	constructor(
		private winRef: WindowRefService,
		private razorpayService: RazorpayService
	) { }

	ngOnInit() { }

	createRzpayOrder() {

		this.razorpayService.getOrderId().subscribe(
			async (result) => {
				this.order_id = result.order.id;
				this.payWithRazor( this.order_id );
			},
			async (error) => {
				console.log('error', error);
			}
		);
	}

	payWithRazor( order_id: any ) {
		const options: any = {

			"key": "rzp_test_48cTOMEXh9OIUO", // Enter the Key ID generated from the Dashboard
			"amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
			"currency": "INR",
			"name": "Acme Corp",
			"description": "Test Transaction",
			"image": "https://example.com/your_logo",
			"order_id": order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
			// "handler": function (response){

			// 	console.log('response', response);
			// 	console.log('response.razorpay_payment_id', response.razorpay_payment_id);
			// 	razorpay_payment_id = response.razorpay_payment_id;
			// },
			// "callback_url": "http://localhost:3000/razorpay/callbackUrl",
			"handler": "",
			"prefill": {
				"name": "Deepak Bawa",
				"email": "bawa_d@ymail.com",
				"contact": "7508498585"
			},
			"notes": {
				"address": "Razorpay Corporate Office"
			},
			"theme": {
				"color": "#3399cc"
			},
			"modal": {
				// We should prevent closing of the form when esc key is pressed.
				escape: false,
			},
		};
		options.handler = ((response: any, error: any) => {
		  options.response = response;
		  this.razorpay_payment_id = response.razorpay_payment_id;
		  console.log('response', response);
		  console.log('options', options);
		  // call your backend api to verify payment signature & capture transaction
		  this.isPaymentSuccessfull();
		});
		options.modal.ondismiss = (() => {
			// handle the case when user closes the form while transaction is in progress
			console.log('Transaction cancelled.');
		});
		const rzp = new this.winRef.nativeWindow.Razorpay(options);
		rzp.open();
	}

	isPaymentSuccessfull() {

		this.razorpayService.isPaymentSuccessfull( this.razorpay_payment_id ).subscribe(
			async (result) => {
				console.log('result', result);
			},
			async (error) => {
				console.log('error', error);
			}
		);
	}
}
