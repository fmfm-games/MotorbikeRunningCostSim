


function CountNumbers(x) {
    let count5 = Math.floor(x / 5);
    x %= 5;

    let count4 = Math.floor(x / 4);
    x %= 4;

    let count3 = Math.floor(x / 3);
    x %= 3;

    let count2 = Math.floor(x / 2);
    x %= 2;

    let count1 = x;

    return [ count1, count2, count3, count4, count5 ];
}

function Range( n, start=0 ) {
    return [ ...Array(n) ].map( (_, i) => i+start );
}

function AccumulateCosts( costs ) {
    const n_item = costs.length;
    return Range( n_item ).map( (i) => costs.slice( 0, i+1 ).reduce( (a, b) => a+b, 0 ) );
}

var myLineChart = null;


function AverageJibaisakiHokenValue( shashu ) {

    if (shashu == "250cc") {
        
    }

}

const jibaiseki_costs = [ 7100, 8920, 10710, 12470, 14200 ];


function JibaisekihokenWithdrawIndicesAndValues( n_use_period ) {

    const jibaiseki_kanyuu_years = CountNumbers( n_use_period );

    const jky = jibaiseki_kanyuu_years.reverse();
    const jc = jibaiseki_costs.reverse();

    var hikiotoshi_idx = 0;
    var hikiotoshi_pairs = [];

    while( !jky.every( i => i == 0 ) ) {

        for (let index = 0; index < jky.length; index++) {
            if( jky[index] == 0 ) continue;

            jky[index] -= 1;
            hikiotoshi_pairs.push( [hikiotoshi_idx, jc[index]] );
            hikiotoshi_idx += (jibaiseki_costs.length - index);
            break;
        }

    }

    return hikiotoshi_pairs;
}


function DrawGraph() {


    const n_use_unit = $("#n_use_unit")[0].value;
    const n_use_period = parseInt( $("#n_use_period")[0].value );

    const shashu = "250cc";
    // var shashu = "400cc";


    // cost for common
    const riding_gear_cost = parseInt( $("#riding_gear_cost")[0].value );
    const gas_cost_per_once = parseInt( $("#gas_cost_per_once")[0].value );
    const use_per_period = parseInt( $("#use_per_period")[0].value );


    // cost for purchase
    const sharyou_daikin = parseInt( $("#sharyou_daikin")[0].value ) * 10000;
    const sharyou_daikin_baikyaku = parseInt( $("#sharyou_daikin_baikyaku")[0].value ) * 0.01;
    


    const jibaiseki_kanyuu_years = CountNumbers( n_use_period );

    const jibaiseki_hikiotoshi_pairs = JibaisekihokenWithdrawIndicesAndValues( n_use_period );
    

    


    const jibaiseki_total = jibaiseki_costs.map( (cost, index) => cost * jibaiseki_kanyuu_years[index] );

    const jibaiseki_per_year = jibaiseki_total.reduce( (a, b) => a+b, 0 ) / n_use_period;
    const ninni_hoken_per_unit = parseInt( $("#ninni_hoken_per_unit")[0].value );
    const keijidousha_tax = parseInt( $("#keijidousha_tax")[0].value );
    const jidousha_juryo_tax = parseInt( $("#jidousha_juryo_tax")[0].value );
    const maintain_cost_per_period = parseInt( $("#maintain_cost_per_period")[0].value );
    const chusha_cost_per_period = parseInt( $("#chusha_cost_per_period")[0].value );

    // cost for rental
    const kaihi_per_month = parseInt( $("#kaihi_per_month")[0].value );
    const rental_cost_per_once = parseInt( $("#rental_cost_per_once")[0].value );


    const chusha_cost = n_use_unit == "年" ? chusha_cost_per_period * 12
        : n_use_unit == "月" ? chusha_cost_per_period
        : n_use_unit == "日" ? 0 : -100000000;

    const ninni_hoken_cost = n_use_unit == "年" ? ninni_hoken_per_unit
        : n_use_unit == "月" ? ninni_hoken_per_unit
        : n_use_unit == "日" ? 0 : -100000000;

    const maintain_cost = n_use_unit == "年" ? maintain_cost_per_period
        : n_use_unit == "月" ? maintain_cost_per_period
        : n_use_unit == "日" ? 0 : -100000000;


    const purchase_cost = [
        ninni_hoken_cost,
        keijidousha_tax,
        chusha_cost,
        maintain_cost,
        gas_cost_per_once * use_per_period
    ].reduce( (a, b) => a+b, 0 );

    const purchase_costs = Range( n_use_period ).map( (i) => purchase_cost );
    purchase_costs[0] += sharyou_daikin + jidousha_juryo_tax + riding_gear_cost;
    purchase_costs[ n_use_period-1 ] -= sharyou_daikin * sharyou_daikin_baikyaku;

    for (let index = 0; index < jibaiseki_hikiotoshi_pairs.length; index++) {
        const [idx, jibaiseki_cost] = jibaiseki_hikiotoshi_pairs[index];
        purchase_costs[idx] += jibaiseki_cost;
    }

    if( n_use_unit == "日" ) {
        purchase_costs[0] += chusha_cost + ninni_hoken_cost + maintain_cost;
    }




    const kaihi_cost = n_use_unit == "年" ? kaihi_per_month * 12
        : n_use_unit == "月" ? kaihi_per_month
        : n_use_unit == "日" ? 0 : -100000000;


    const rental_year_cost = [
        kaihi_cost,
        rental_cost_per_once * use_per_period,
        gas_cost_per_once * use_per_period,
    ].reduce( (a, b) => a+b, 0 );

    const rental_costs = Range( n_use_period ).map( (i) => rental_year_cost );
    rental_costs[0] += riding_gear_cost;



    const ctx = document.getElementById('myChart');

    if( myLineChart != null ) myLineChart.destroy();

    myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Range( n_use_period ).map( (i) => `${i+1}${n_use_unit}目` ),
            datasets: [
                {
                    label: '購入',
                    data: AccumulateCosts( purchase_costs ),
                    borderColor: "rgba(255,0,0,255)",
                    backgroundColor: "rgba(255,0,0,255)"
                },
                {
                    label: 'レンタル',
                    data: AccumulateCosts( rental_costs ),
                    borderColor: "rgba(0,0,255,255)",
                    backgroundColor: "rgba(0,0,255,255)"
                }
            ],
        },
    });

}

DrawGraph();
