import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'payu-angular';

  constructor(
    private api: ApiService
  ) {

  }

  buyProduct() {

    this.api.payUBuy()
      .subscribe(arg => {
        
        const product = arg.info;
        
        const paymentDetails = {
          payu_url: product.payu_url,
          first_name: product.first_name, 
          email: product.email,
          mobile: product.mobile, 
          callback_url: product.call_back_url, 
          payu_cancel_url: product.payu_cancel_url, 
          payu_fail_url: product.payu_fail_url, 
          payu_merchant_key: product.payu_merchant_key, 
          payu_sha_token: product.payu_sha_token, 
          txnid: product.txnId, 
          plan_name: product.plan_name, 
          amount: product.amount, 
          service_provider: product.service_provide
      };
      
      let paymentString = `
          <html>
            <body>
              <form action="${paymentDetails.payu_url}" method="post" id="payu_form">
                <input type="hidden" name="firstname" value="${paymentDetails.first_name}"/>
                <input type="hidden" name="email" value="${paymentDetails.email}"/>
                <input type="hidden" name="phone" value="${paymentDetails.mobile}"/>
                <input type="hidden" name="surl" value="${paymentDetails.callback_url}"/>
                <input type="hidden" name="curl" value="${paymentDetails.payu_cancel_url}"/>
                <input type="hidden" name="furl" value="${paymentDetails.payu_fail_url}"/>
                <input type="hidden" name="key" value="${paymentDetails.payu_merchant_key}"/>
                <input type="hidden" name="hash" value="${paymentDetails.payu_sha_token}"/>
                <input type="hidden" name="txnid" value="${paymentDetails.txnid}"/>
                <input type="hidden" name="productinfo" value="${paymentDetails.plan_name}"/>
                <input type="hidden" name="amount" value="${paymentDetails.amount}"/>
                <input type="hidden" name="service_provider" value="${paymentDetails.service_provider}"/>
                <button type="submit" value="submit" #submitBtn></button>
              </form>
              <script type="text/javascript">document.getElementById("payu_form").submit();</script>
            </body>
          </html>`;
      
      const winUrl = URL.createObjectURL(
          new Blob([paymentString], { type: "text/html" })
      );
      
      window.location.href = winUrl;

      });
    

  

  }


}
