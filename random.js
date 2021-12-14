

const tres = 'https://tres-bien.com/new-arrivals?p=1'

const uniqloMShop = "https://www.uniqlo.com/us/en/men/new-arrivals"
const uniqloWShop = "https://www.uniqlo.com/us/en/women/new-arrivals"
const zaraWNewArrivals = "https://www.zara.com/ca/en/woman-new-in-l1180.html?v1=1881787"

const kollectionNewArrivals = "https://kollektion.ca/collections/furniture-lighting/products.json"
const stussyNewArrivals = "https://www.stussy.com/collections/new-arrivals/products.json"
const havenshop = 'https://shop.havenshop.com/collections/new-arrivals/products.json'
const doverstreet = 'https://shop.doverstreetmarket.com/collections/whats-new/products.json'
const lessonseven = 'https://lessoneseven.com/collections/latest-arrivals/products.json'
const braindead = 'https://wearebraindead.com/products.json'



//get new arrivals tres bien
const tresbien = () => {
    axios(tres)
        .then(res => {
            const html = res.data
            const $ = cheerio.load(html)

            let products = []
            $('.product-item-info', html).each(function () {
                const title = $(this).find('a').text()
                const url = $(this).find('a').attr('href')
                const img = $(this).find('img').attr('srcset')
                const price = $(this).find('.price-wrapper').attr('data-price-amount')

                const product = {
                    title,
                    url,
                    img,
                    price,
                    store: 'tres-bien',
                    date: Date.now()
                }
                products.push(product)
            })

            run(products)
        }).catch(error => console.log('error'))
}


const uniqloW = () => {
    axios(uniqloWShop)
        .then(res => {
            const html = res.data
            const $ = cheerio.load(html)
            const products = []
            $('.product-tile', html).each(function () {
                // const title = $(this).find('a').text()
                const brand = $(this).find('a').text()
                const title = $(this).find('.link').text()
                const price = $(this).find('.value').text().trim()
                const url = "https://uniqlo.com" + $(this).find('a').attr('href')
                const img = $(this).find('.tile-image').attr('src')

                const product = {
                    brand: 'uniqlo',
                    title,
                    price,
                    url,
                    img,
                    store: 'uniqlo-womens',
                    date: Date.now()
                }
                products.push(product)
            })
            run(products)
        }).catch(error => console.log('error uniqlow'))
}



const uniqloM = () => {
    axios(uniqloMShop)
        .then(res => {
            const html = res.data
            const $ = cheerio.load(html)
            const products = []
            $('.product-tile', html).each(function () {
                // const title = $(this).find('a').text()
                // const brand = $(this).find('a').text()
                const title = $(this).find('.link').text()
                const price = $(this).find('.value').text().trim()
                const url = "https://uniqlo.com" + $(this).find('a').attr('href')
                const img = $(this).find('.tile-image').attr('src')


                const product = {
                    brand: 'uniqlo',
                    title,
                    price,
                    url,
                    img,
                    store: 'uniqlo-mens',
                    date: Date.now()
                }

                products.push(product)
            })
            run(products)
        }).catch(error => console.log('erroruniqlom'))
}


// tresbien()
// uniqloW()
// uniqloM()
// getShopifyNewArrivals(stussyNewArrivals,"stussy");
// getShopifyNewArrivals(havenshop,"haven");
// getShopifyNewArrivals(kollectionNewArrivals,"kollektion")
// getShopifyNewArrivals(doverstreet,"DSM")
// getShopifyNewArrivals(lessonseven,"less 17")
// getShopifyNewArrivals(braindead, "brain dead")

// setInterval(() => {
//     tresbien()
//     uniqloW()
//     uniqloM()
//     getShopifyNewArrivals(stussyNewArrivals,"stussy");
//     getShopifyNewArrivals(havenshop,"haven");
//     getShopifyNewArrivals(kollectionNewArrivals,"kollektion")
//     getShopifyNewArrivals(doverstreet,"DSM")
//     getShopifyNewArrivals(lessonseven, "less 17")
//     getShopifyNewArrivals(braindead, "brain dead")
// }, 10000 * 60 * 60);
