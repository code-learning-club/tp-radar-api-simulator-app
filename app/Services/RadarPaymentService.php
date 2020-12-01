<?php

namespace App\Services;

class RadarPaymentService
{
    /**
    * Define the base url
    *
    * @var string
    */
    private $base_url = "https://sandbox.radarpayment.online/payment/rest/";

    /**
     * Make order registration
     *
     * @param int $order_id
     * @param integer $amount
     * @param string $description
     * @return array
     */
    public function register(int $order_id, int $amount, string $description = '')
    {
        $ch = curl_init();
        
        $post_fields = http_build_query([
            "orderNumber" => $order_id,
            "amount" => $amount,
            "currency" => "978",
            "returnUrl" => $_SERVER["REMOTE_ADDR"].'/api/callaback?orderId='.$order_id,
            "description" => $description,
            "userName" => "sandbox-api",
            "password" => "sandbox-api"
        ]);

        curl_setopt($ch, CURLOPT_URL, $this->base_url.'/register.do');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $server_response = json_decode(curl_exec($ch), true);

        return $server_response;
    }

    /**
     * Get the payment status
     *
     * @param string $radar_order_id
     * @return array
     */
    public function getPaymentStatus(string $radar_order_id)
    {
        $ch = curl_init();

        $post_fields = http_build_query([
            "orderId" => $radar_order_id,
            "userName" => "sandbox-api",
            "password" => "sandbox-api"
        ]);

        curl_setopt($ch, CURLOPT_URL, $this->base_url . '/getOrderStatusExtended.do');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $server_response = json_decode(curl_exec($ch), true);

        return $server_response;
    }

    /**
     * Make payment via card handler
     *
     * @param string $radar_order_id
     * @param string $pan
     * @param string $cvc
     * @param string $year
     * @param string $month
     * @return mixed
     */
    public function makeCardPayment(string $radar_order_id, string $pan, string $cvc, string $year, string $month)
    {
        $ch = curl_init();

        $post_fields = http_build_query([
            "userName" => "sandbox-api",
            "password" => "sandbox-api",
            "\$PAN" => $pan,
            "\$CVC" => $cvc,
            "MDORDER" => $radar_order_id,
            "YYYY" => $year,
            "MM" => $month,
            "TEXT" => "Card Holder",
            "ip" => $_SERVER['REMOTE_ADDR'],
        ]);

        curl_setopt($ch, CURLOPT_URL, $this->base_url . '/paymentorder.do');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $server_response = json_decode(curl_exec($ch), true);
        if ($server_response['errorCode'] == 0) {
            $server_response['ascRedirect'] = 'https://sandbox.radarpayment.online/payment/acsRedirect.do?orderId='.$radar_order_id;
        }

        return $server_response;
    }
}
    