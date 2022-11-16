import { faker } from '@faker-js/faker';



async function main(){
    for(let i = 0; i < 100; i++){
        await prisma.customer.create({
            data:{
                customer_name:`${faker.name.fullName()}`,
                customer_code:`dsfkl`,
                customer_salesCode:`${faker.address.countryCode('alpha-2')}`,
                vertical_market:'industry',
                customer_address:`${faker.address.streetAddress()}`,
                customer_province:`${faker.address.country()}`,
                customer_city:`${faker.address.city()}`,
                customer_postal_code:`${faker.address.zipCode()}`,
                customer_phone:`${faker.phone.number('+62 ### ## ##')}`,

                Quotation:{
                    create:{
                        quotation_num:`${faker.random.alphaNumeric(7)}`,
                        quotation_value:`${faker.commerce.product()}`,
                        quotation_product:`${faker.commerce.productName()}`,
                        quotation_quantity:Number(faker.random.numeric(1)),

                        MOP:{
                            create:{
                                mop_num:`${faker.random.alphaNumeric(7)}`,
                                mop_value:`${faker.commerce.product()}`
                            }
                        },
                        SalesPipeline:{
                            create:{
                                salesPipeline_date:`${faker.date.recent()}`,
                                salesPipeline_closeEstimation:`${faker.date.recent()}`,
                                salesPipeline_salesCode:`${faker.address.countryCode('alpha-2')}`,
                                salesPipeline_cust_name:`${faker.name.fullName()}`,
                                project_name:`${faker.name.jobTitle()}`,
                                product:`${faker.commerce.product()}`,
                                quantity:Number(faker.random.numeric(1)),
                                Pi_status:`${faker.random.alphaNumeric(5)}`,
                                M_num:`${faker.random.alphaNumeric(7)}`,
                                close_date:`${faker.date.recent()}`,
                                note:`${faker.commerce.productDescription()}`
                            }
                        }
                    }
                },
                VerticalMarket:{
                    create:{
                        vertical_market:'industry',
                        Group:{
                            create:{
                                group:`${faker.company.name()}`
                            }
                        }
                    }
                },
                salesActivity:{
                    create:{
                        date:`${faker.date.recent()}`,
                        type_followup:faker.datatype.boolean(),
                        job_desc:`${faker.company.catchPhrase()}`
                    }
                },
                // PIC:{
                //     create:{
                //         P_name:"testing",
                //         P_position: "testing",
                //         P_email:"testing",
                //         P_phone:"testing",
                //         P_sales_code:"testing"
                //     }
                // }
            }
        })
    }
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async() => {
    await prisma.$disconnect();
});