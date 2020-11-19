{
    "order_info": {
        "id": 38,
        "remarks": "igut ofgnio",
        "table": 18,
        "status": "4_CREATE_INVOICE",
        "status_details": "Create Invoice",
        "price": {
            "grand_total_price": "3507.504000",
            "tax_amount": "375.804000",
            "service_charge": "284.7000",
            "total_price": "2847.00"
        },
        "invoice_info": {
            "id": "abb1f332-70e3-4cd3-bec3-55d33a9a8248",
            "deleted_at": null,
            "grand_total": "3507.50"
        },
        "ordered_items": [
            {
                "id": 80,
                "quantity": 3,
                "food_order": 38,
                "status": "4_CANCELLED",
                "food_name": "Pizza Sa",
                "food_option": {
                    "id": 112,
                    "option_type": {
                        "id": 3,
                        "name": "size"
                    },
                    "name": "asd",
                    "price": "32.00",
                    "food": 43
                },
                "food_extra": [
                    {
                        "id": 41,
                        "name": "asd",
                        "price": "345.00",
                        "food": 37,
                        "extra_type": 1
                    }
                ]
            },
            {
                "id": 79,
                "quantity": 3,
                "food_order": 38,
                "status": "3_IN_TABLE",
                "food_name": "asdas",
                "food_option": {
                    "id": 108,
                    "option_type": {
                        "id": 4,
                        "name": "spice_label"
                    },
                    "name": "asdas",
                    "price": "23.00",
                    "food": 33
                },
                "food_extra": [
                    {
                        "id": 41,
                        "name": "asd",
                        "price": "345.00",
                        "food": 37,
                        "extra_type": 1
                    },
                    {
                        "id": 42,
                        "name": "asdasd",
                        "price": "213.00",
                        "food": 38,
                        "extra_type": 1
                    }
                ]
            },
            {
                "id": 81,
                "quantity": 3,
                "food_order": 38,
                "status": "3_IN_TABLE",
                "food_name": "asdas",
                "food_option": {
                    "id": 108,
                    "option_type": {
                        "id": 4,
                        "name": "spice_label"
                    },
                    "name": "asdas",
                    "price": "23.00",
                    "food": 33
                },
                "food_extra": [
                    {
                        "id": 41,
                        "name": "asd",
                        "price": "345.00",
                        "food": 37,
                        "extra_type": 1
                    }
                ]
            }
        ],
        "table_name": "Hasan Bro",
        "table_no": 5,
        "waiter": {
            "name": "sdfsd",
            "id": 63
        },
        "restaurant_info": {
            "id": 1,
            "name": "Food King"
        }
    },
    "status": true,
    "msg": "Invoice Created"
}







// test object

{"error":{"code":null,"error_details":null},"data":{"id":49,"remarks":"string","table":19,"status":"3_IN_TABLE","status_details":"Food Served","price":{"grand_total_price":157.696,"tax_amount":16.896,"service_charge":12.8,"total_price":128.0},"ordered_items":[{"id":103,"quantity":2,"food_order":49,"status":"4_CANCELLED","food_name":"Burger","food_option":{"id":30,"option_type":{"id":3,"name":"size"},"name":"large","price":"400.00","food":35},"food_extra":[]},{"id":101,"quantity":2,"food_order":49,"status":"3_IN_TABLE","food_name":"Pizza Sa","food_option":{"id":112,"option_type":{"id":3,"name":"size"},"name":"asd","price":"32.00","food":43},"food_extra":[]},{"id":102,"quantity":2,"food_order":49,"status":"3_IN_TABLE","food_name":"New food","food_option":{"id":117,"option_type":{"id":3,"name":"size"},"name":"asdasd","price":"32.00","food":45},"food_extra":[]}],"table_name":"21 no table","table_no":21,"waiter":{"name":"Abul","id":64},"restaurant_info":{"id":1,"name":"Food King"}},"status":true,"msg":"Served"}


// create invoice
{"error":{"code":null,"error_details":null},"data":{"id":52,"remarks":"string","table":19,"status":"4_CREATE_INVOICE","status_details":"Create Invoice","price":{"grand_total_price":"157.696000","tax_amount":"16.896000","service_charge":"12.8000","total_price":"128.00"},"ordered_items":[{"id":109,"quantity":2,"food_order":52,"status":"4_CANCELLED","food_name":"Burger","food_option":{"id":30,"option_type":{"id":3,"name":"size"},"name":"large","price":"400.00","food":35},"food_extra":[]},{"id":108,"quantity":2,"food_order":52,"status":"3_IN_TABLE","food_name":"New food","food_option":{"id":117,"option_type":{"id":3,"name":"size"},"name":"asdasd","price":"32.00","food":45},"food_extra":[]},{"id":107,"quantity":2,"food_order":52,"status":"3_IN_TABLE","food_name":"Pizza Sa","food_option":{"id":112,"option_type":{"id":3,"name":"size"},"name":"asd","price":"32.00","food":43},"food_extra":[]}],"table_name":"21 no table","table_no":21,"waiter":{"name":"Abul","id":64},"restaurant_info":{"id":1,"name":"Food King"},"invoice":{"deleted_at":null,"id":"bbecf705-a12d-448f-a1fc-cadeda79b3a6","restaurant_id":1,"order_id":52,"grand_total":157.696,"updated_at":"2020-11-19","created_at":"2020-11-19","payment_status":"0_UNPAID"}},"status":true,"msg":"Invoice Created"}