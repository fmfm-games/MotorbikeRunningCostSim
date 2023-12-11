

function ChangeUseUnit() {

    const n_use_period = $("#n_use_period")[0].value;
    const n_use_unit = $("#n_use_unit")[0].value;


    const use_per_period_label = $( "#use_per_period_label" )[0];
    use_per_period_label.textContent = `乗る回数 [回/${n_use_unit}]`;


    const use_per_period = $( "#use_per_period" );
    const ninni_hoken_per_unit_label = $( "#ninni_hoken_per_unit_label" )[0];


    const maintain_cost_per_period_label = $( "#maintain_cost_per_period_label" )[0];
    const chusha_cost_per_period_label = $( "#chusha_cost_per_period_label" )[0];
    const jibaiseki_hoken_label = $( "#jibaiseki_hoken_label" )[0];
    

    if( n_use_unit == "日" ) {
        use_per_period.prop( "disabled", true );
        use_per_period[0].value = "1";

        ninni_hoken_per_unit_label.textContent = `任意保険代金 [円/${n_use_period}日]`;
        maintain_cost_per_period_label.textContent = `メンテナンスコスト [円/${n_use_period}日]`;
        chusha_cost_per_period_label.textContent = `駐車場代金 [円/${n_use_period}日]`;
        jibaiseki_hoken_label.textContent = `自賠責保険 [円/${n_use_period}日]`;
    }
    if( n_use_unit == "月" ) {
        use_per_period.prop( "disabled", false );

        ninni_hoken_per_unit_label.textContent = `任意保険代金 [円/月]`;
        maintain_cost_per_period_label.textContent = `メンテナンスコスト [円/月]`;
        chusha_cost_per_period_label.textContent = `駐車場代金 [円/月]`;
        jibaiseki_hoken_label.textContent = `自賠責保険 [円/年]`;
    }
    if( n_use_unit == "年" ) {
        use_per_period.prop( "disabled", false );

        ninni_hoken_per_unit_label.textContent = `任意保険代金 [円/年]`;
        maintain_cost_per_period_label.textContent = `メンテナンスコスト [円/年]`;
        chusha_cost_per_period_label.textContent = `駐車場代金 [円/月]`;
        jibaiseki_hoken_label.textContent = `自賠責保険 [円/年]`;
    }


}

function UpdateGasCost() {

    const nenpi = parseInt( $("#nenpi")[0].value );
    const gas_cost_per_L = parseInt( $("#gas_cost_per_L")[0].value );
    const kyori_per_once = parseInt( $("#kyori_per_once")[0].value );

    const required_amount_of_gas = kyori_per_once / nenpi;
    $("#required_amount_of_gas")[0].value = required_amount_of_gas;

    const gas_cost_per_once = gas_cost_per_L * required_amount_of_gas;
    $("#gas_cost_per_once")[0].value = gas_cost_per_once;

}





