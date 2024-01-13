// #gameにスタート画面を表示させる。スペースキーを押すとゲームスタート
function startGame() {
	// 	'スペースキーを押してゲームスタート';
	document.addEventListener('keydown', function (event) {
		if (event.defaultPrevented) {
			return;
		}
		if (event.code === 'Space') {
			document.getElementById('game').innerHTML = '';
			gameStart();
		}
	});
}
startGame();

// タイピングゲームスタート
function gameStart() {
	// #gameの背景色を変更
	document.getElementById('game').classList.add('start');

	// #typingに#wordを作成
	const typing = document.createElement('div');
	const wordInner = document.createElement('div');
	wordInner.id = 'wordInner';
	wordInner.classList.add('word-inner');
	typing.id = 'word';
	typing.style.color = '#ffffff';
	document.getElementById('game').appendChild(wordInner).appendChild(typing);

	//入力文字数のカウント
	let count = 0;

	//ミスの判定
	let miss = 0;

	//制限時間を追加(秒)
	const time = 15;

	//タイマーを追加
	let timer = document.createElement('div');
	timer.id = 'timer';
	timer.classList.add('time-text');
	timer.textContent = time + '秒';
	document.getElementById('game').appendChild(timer);

	//タイマーをカウントダウン

	//60秒後の日時を取得
	const target = new Date(
		new Date().getFullYear(),
		new Date().getMonth(),
		new Date().getDate(),
		new Date().getHours(),
		new Date().getMinutes(),
		new Date().getSeconds() + 16
	);

	let countDown = setInterval(function () {
		const now = new Date(); //今の日時

		const diff = target.getTime() - now.getTime(); //残り時間を計算

		if (diff < 0) return false; //残り時間が0になったら終了

		//残り時間を秒に変換
		const difSec = Math.floor(diff / 1000) % 60;

		timer.textContent = difSec < 10 ? difSec + '秒' : difSec + '秒'; //残り時間を表示

		if (difSec <= 0) {
			clearInterval(countDown);
			typingResult();
		}
	}, 1000);

	//タイピングゲームのメイン処理
	typingGame();

	function typingGame() {
		// タイピングゲームの単語リスト
		const words = [
			'apple',
			'banana',
			'cherry',
			'grape',
			'lemon',
			'melon',
			'orange',
			'peach',
			'pear',
			'strawberry',
			'watermelon',
		];

		// タイピングゲームの単語リストからランダムに単語を選択
		let word = words[Math.floor(Math.random() * words.length)];

		// タイピングゲームの文字列を配列に変換
		let wordArray = word.split('');

		// タイピングゲームの文字列を1文字ずつspanで囲む
		wordArray.forEach((element) => {
			const span = document.createElement('span');
			span.textContent = element;
			document.getElementById('word').appendChild(span);
		});

		// キーが入力されたら、入力されたキーと一致する文字をspanのクラスにdoneを追加
		function keyTyping() {
			let key = '';
			document.addEventListener('keydown', function (event) {
				if (event.defaultPrevented) {
					return;
				}
				key = event.key;
				if (key === ' ' || key === 'Enter') {
					window.location.reload();
				}
				if (key === wordArray[0] && wordArray.length > 0) {
					//spanにmissクラスを削除
					document
						.getElementById('word')
						.querySelector('span:not(.done)')
						.classList.remove('miss');
					//spanにdoneクラスを追加
					document
						.getElementById('word')
						.querySelector('span:not(.done)')
						.classList.add('done');
					count++;
					wordArray.shift();

					if (wordArray.length !== 0) {
						keyTyping();
					} else {
						document.getElementById('word').innerHTML = '';
						word = words[Math.floor(Math.random() * words.length)];
						wordArray = word.split('');
						wordArray.forEach((element) => {
							const span = document.createElement('span');
							span.textContent = element;
							document.getElementById('word').appendChild(span);
						});
					}
				} else {
					//spanにdoneクラスを追加
					document
						.getElementById('word')
						.querySelector('span:not(.done)')
						.classList.add('miss');
					miss++;
					keyTyping();
				}
				// キーイベントのデフォルトアクションをキャンセル
				event.preventDefault();
			});
		}
		keyTyping();
	}
	//タイピング結果を表示
	function typingResult() {
		document.getElementById('game').innerHTML = '';
		document.getElementById('game').classList.add('done');

		//結果を表示
		const result = document.createElement('div');
		result.id = 'result';
		result.classList.add('result-text');
		result.textContent = '結果';
		document.getElementById('game').appendChild(result);

		//結果を表示
		const resultText = document.createElement('div');
		resultText.id = 'resultText';
		resultText.classList.add('score');
		resultText.textContent = 'スコア:' + count;

		//ミスを表示
		const missText = document.createElement('div');
		missText.id = 'missText';
		missText.classList.add('miss-text');
		missText.textContent = 'ミス:' + miss;

		document.getElementById('game').appendChild(resultText);
		document.getElementById('game').appendChild(missText);

		//リトライボタンを表示
		const retry = document.createElement('div');
		retry.id = 'retry';
		retry.classList.add('retry-text');
		retry.textContent = 'リトライ(もしくはスペースキー) ';
		document.getElementById('game').appendChild(retry);

		//リトライボタンを押したらリロード
		retry.addEventListener('click', function () {
			window.location.reload();
		});
	}
}
