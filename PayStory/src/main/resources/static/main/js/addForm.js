/**
 * addExpenditureForm.js
 *  - 지출 항목 추가 form 이벤트
 */

 $(function(){
	/***** 엔터키 submit 안 되게 OK *****/
	$(document).on('keydown', function(e){
		if(e.keyCode == 13) e.preventDefault();
	});
	
	/******** 아이템 영역  ********/
	// 아이템 보기 버튼 클릭 - css 적용 OK
	$('.showItem').on('click', function(){
		$('.fa-angle-down').toggleClass('open');
	});
	
	// 아이템 추가 OK
	$('#addItem').on('click', function(e){
		e.preventDefault();
		// 내용
		let itemHTML = '<div class="col-7">'+
				   '<input type="text" class="expenditureItem form-control form-control-sm shadow-none" required>'+'</div>';
		// 금액
		let priceHTML = '<div class="col-4">'+
					  '<input type="text" class="expenditureItemAmount form-control form-control-sm shadow-none" required>'+'</div>';
		// 삭제 버튼
		let removeHTML = '<div class="col-1"><button class="removeItem btn shadow-none p-0"><i class="fas fa-minus-circle"></i></button></div>';
		
		let addItemDiv = '<div class="item form-group form-row" id="newItem">'+itemHTML+priceHTML+removeHTML+'</div></div>';
		$('#itemWrap').append(addItemDiv);
	});
	
	// 아이템 삭제 OK
	$(document).on('click', '.removeItem' ,function(e){
		e.preventDefault();
		let currentItem = $(this).parent().parent();
		
		// 삭제 전에 합계 금액에서 빼기 OK
		let totalAmount = parseInt(withoutComma($('#expenditureTotalAmount').val()));
		let thisItemAmount = parseInt(withoutComma($(this).parent().prev().find('.expenditureItemAmount').val()));
		$('#expenditureTotalAmount').val(withComma(totalAmount-thisItemAmount));
		
		// 맨 위의 아이템이면
		if(currentItem.hasClass('default')){
			currentItem.find('.expenditureItem').val(' ');
			currentItem.find('.expenditureItemAmount').val(' ');
		}else {
			currentItem.remove(); 
		}
	});
	
	// 내용 입력란 keydown 이벤트 : 엔터 눌렀을 때, 입력한 값이 있다면 금액 입력란으로 focus OK
	$(document).on('keydown', '.expenditureItem', function(e){
		if(e.keyCode == 13) {
			let inputAmount = $(this).parent().next().find('.expenditureItemAmount');
			inputAmount.focus();
		}
	});
	
	// 금액 입력란 keydown 이벤트 : 엔터 눌렀을 때, 입력한 값이 있고, 다음 칸이 있다면 다음 내용 입력란 focus OK
	$(document).on('keydown', '.expenditureItemAmount', function(e){
		if(e.keyCode == 13) {
			let inputItem = $(this).parent().parent().next().find('.expenditureItem');
			if(inputItem) inputItem.focus();
		}
	});
	
	/***** 금액 입력 EVENT *****/
	// 금액 천단위 콤마 생성
	function withComma(num){
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}
	// 금액 콤마 해제
	function withoutComma(num) {
		return num.toString().replace(",", '');
	}
	
	// 금액 입력란 keyup 이벤트
	$(document).on('keyup', '.expenditureItemAmount', function(){
		// 숫자만 입력
		$(this).val($(this).val().replace(/[^0-9]/g, ''));
		
		// 콤마
		let amount = $(this).val() || '0';
		let amountWithComma = withComma(parseInt(amount));
		$(this).val(amountWithComma);
	});
	
	/***** 합계 ****/ 
	function sumAmount(){
		let sum = 0; 
		$('.expenditureItemAmount').each(function(){
			let itemAmount = $(this).val();
			if(itemAmount){
				sum += parseInt(withoutComma(itemAmount));
			}
		});
		$('#expenditureTotalAmount').val(withComma(sum));
	}
	
	// 금액 입력란에서 focusout 되면 합계 OK
	$(document).on('focusout', '.expenditureItemAmount', function(){
		sumAmount();
	});
	
	/****** 메모 ******/
	// 메모 글자수 제한
	$('.memoBox').on('keyup', function(){ 
		let content = $(this).val(); 
		// 글자수 세기 
		if (content.length == 0 || content == '') { 
			$('.textCount').text('0'); 
		} else { 
			$('.textCount').text(content.length); 
		} 
		
		// 글자수 제한 
		if (content.length > 100) { 
			// 100자 부터는 타이핑 되지 않도록 
			$(this).val($(this).val().substring(0, 100)); 
			// 100자 넘으면 알림창 뜨도록 
			alert('글자수는 100자까지 입력 가능합니다.'); 
		} 
	});
	
	/***** 영수증 이미지 영역 : 반응형 CSS 적용 *****/
	$(window).resize(function(){
		if($(window).width() <= 990) {
			$('#receiptImg').addClass('hidden');
		}else {
			$('#receiptImg').removeClass('hidden');
		}
	});
});