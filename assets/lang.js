/**
 *
 * @param language The language to use
 * @param replaceText If true, replace all the occurency marked with placemark {lang=<key>}
 */
var translArrGram= {
        en:{
			Grammar : "Grammar"
			, Back : "Back"
			, Language : "Language:"
			, pageTitle : "Greek Morphology Codes : Ten Parts of Speech"
			, gotoPronunciation : "(go to Pronunciation Page)"
			, Preposition : "Preposition"
			, Conjunction : "Conjunction"
			, parTicle : "parTicle"
			, Interjection : "Interjection"
			, adverB : "adverB"
			, Degree : "Degree"
			, pRonoun : "pRonoun"
			, Personal : "Personal"
        	, person1 : "1st person"
        	, person2 : "2nd person"
        	, person3 : "3rd person"
        	, Relative : "Relative"
        	, Demonstrative : "Demonstrative"
        	, interroGative : "Interrogative"
        	, Indefinite : "indefinite"
        	, inTensive : "inTensive"
        	, refleXive : "reFlexive"
        	, reCiprocal : "reCiprocal"
        	, poSessive : "poSessive"
        	, correlative : "correlative"
        	, Gender : "Gender"
        	, Case : "Case"
        	, Number : "Number"
        	, Degree : "Degree(For Adj only)"
        	, Nominative : "Nominative"
        	, Masculine : "Masculine"
        	, Singular : "Singular"
        	, Comparative : "Comparative"
        	, Genitive : "Genitive"
        	, Feminine : "Feminine"
        	, Plural : "Plural"
        	, Superlative : "Superlative"
        	, Dative : "Dative"
        	, Neuter : "Neuter"
        	, Accusative : "Accusative"
        	, Vocative : "Vocative"
        	, indeclinable : "indeclinable"
        	, Noun : "Noun"
        	, Definitearticle : "Definite article"
        	, Adjective : "Adjective"
        	, Verb : "Verb"
        	, Mode : "Mode"
        	, Tense : "Tense"
        	, Voice : "Voice"
        	, Indicative : "Indicative"
        	, Present : "Present"
        	, Active : "Active"
        	, iMperative : "iMperative"
        	, Imperfect : "Imperfect"
        	, Middle : "Middle"
        	, Subjunctive : "Subjunctive"
        	, Future : "Future"
        	, Passive : "Passive"
        	, Optative : "Optative"
        	, Aorist : "Aorist"
        	, mid_pass : "either mid/pass"
        	, none : "none"
        	, perfect : "perfect"
        	, Participle : "Participle"
        	, pLuperfect : "pLuperfect"
        	, ParticipleExt : "+ (Participle continued with Case Gender Number)"
        	, iNfinitive : "iNfinitive"
        	, ModeExpl : "The speaker expresses his different expectation of the action. Only include first four items."
        	, IndicativeExpl : "a definite of fact or an actual occurrence."
        	, iMperativeExpl : "a command or instruction given to the hearer."
        	, SubjunctiveExpl : "Express a possible action that might happen."
        	, OptativeExpl : "a wish or hope for a certain action to occur."
        	, iNfinitiveExpl : "verbal noun."
        	, ParticipleExpl : "verbal adjective, adverb or noun, which includes subject information."
        	, indeclinableExpl : "foreign language origin."
        	, TenseExpl : "Fixes verbal action with regard to time and aspect."
        	, PresentExpl : "Continuous action in the present. \"I am washing.\""
        	, ImperfectExpl : "Continuous action going on in past time. \"I was washing.\""
        	, FutureExpl : "Expresses action in the future. \"I shall wash.\""
        	, AoristExpl : "Expresses action as a point and not over a period of time. \"I washed\""
        	, perfectExpl : "Expresses the results of the action to continue to exist. \"I have washed\""
        	, pLuperfectExpl : "Expresses continuance of the completed state in past time up to a prescribed limit in the past. \"I had washed\""
        	, VoiceExpl : "This part of the verb relates the verbal action to the subject."
        	, ActiveExpl : "The active voice represents the subject as acting."
        	, MiddleExpl : "The middle voice represents the subject as acting with reference to himself."
        	, PassiveExpl : "The passive voice represents the subject as acted upon."
			, mid_passExpl : "Either middle or passive, often translated into active. "
        	, noteVerb : "* The single letter is a short hand notation for the part of the verb it represents."
			
        	, NominativeExpl : "is the case of the subject. Root idea is designation."
        	, GenitiveExpl : "is the case of possession \"of\"; origin or separation, \"from\"."
        	, DativeExpl : "is the case of personal interest, corresponding to the English 'to'/'for', indirect object, \"to\"; location \"in\", \"at\"; instrument, \"with\"."
        	, AccusativeExpl : "is the case of extension, corresponding to the direct object. Root idea is limitation; motion toward; time: \"how long\"."
        	, VocativeExpl : "is the case of direct address."
        	, noteNoun : "A noun does not express action of any kind. Mood is not relevant to a noun. To try to use a noun as a verb is to abandon any certainty of that action being completed. Example is “Faith”. Faith commonly used as a verb which is not possible."
        	, PrepositionHtml : '	<b >'
			+'	Greek Prepositional Means Classified <a href="http://www.bcbsr.com/greek/gprep.html" target="_blank">(go to more details)</a>'
			+'</b>'
			+'<table border="1" style="border-collapse: collapse;">'
			+'	<tbody>'
			+'		<tr>'
			+'			<td>Word+Strong&rsquo;s</td><td>Direction</td><td>Position</td><td>Relation</td><td>Agency</td><td>Means</td><td>Cause</td><td>Association</td><td>Purpose</td>'
			+'		</tr>'
			+'		<tr>'
			+'			<td>ἀνά<a target="_blank" href="https://www.blueletterbible.org/lang/lexicon/lexicon.cfm?page=1&strongs=G303">303</a></td>'
			+'			<td>up</td><td>in, by</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>'
			+'		<tr>'
			+'			<td>ἀντί <a target="_blank" href="https://www.blueletterbible.org/lang/lexicon/lexicon.cfm?page=1&strongs=G473">473</a></td>'
			+'			<td>&nbsp;</td><td>&nbsp;</td><td>In exchange for, instead of, for</td><td>&nbsp;</td><td>&nbsp;</td><td>Because of</td><td>&nbsp;</td><td>&nbsp;</td>'
			+'		</tr>'
			+'		<tr>'
			+'			<td>ἀπό <a target="_blank" href="https://www.blueletterbible.org/lang/lexicon/lexicon.cfm?page=1&strongs=G575">575</a></td>'
			+'			<td>from</td><td>&nbsp;</td><td>For</td><td>by</td><td>&nbsp;</td><td>On account of</td><td>&nbsp;</td><td>&nbsp;</td>'
			+'		</tr>'
			+'		<tr><td>διά <a target="_blank" href="https://www.blueletterbible.org/lang/lexicon/lexicon.cfm?page=1&strongs=G1223">1223</a></td>'
			+'			<td>through</td><td>&nbsp;</td><td>For</td><td>by</td><td>through, by means of</td><td>because of</td><td>&nbsp;</td><td>for the sake of</td>'
			+'		</tr>'
			+'		<tr>'
			+'			<td>εἰς <a target="_blank" href="https://www.blueletterbible.org/lang/lexicon/lexicon.cfm?page=1&strongs=G1519">1519</a></td>'
			+'			<td>into, unto, to</td><td>in, among, upon</td><td>as, for, against, in respect to</td><td>&nbsp;</td><td>&nbsp;</td><td>because of</td><td>&nbsp;</td><td>for the purpose of</td>'
			+'		</tr>'
			+'		<tr>'
			+'			<td>ἐκ <a target="_blank" href="https://www.blueletterbible.org/lang/lexicon/lexicon.cfm?page=1&strongs=G1537">1537</a></td>'
			+'			<td>out of</td><td>On</td><td></td><td>&nbsp;</td><td>by means of</td><td>because of</td><td>&nbsp;</td><td>&nbsp;</td>'
			+'		</tr>'
			+'		<tr>'
			+'			<td>ἐν <a target="_blank" href="https://www.blueletterbible.org/lang/lexicon/lexicon.cfm?page=1&strongs=G1722">1722</a></td>'
			+'			<td>in</td><td>in, within</td><td>in, as, for</td><td></td><td>by, with</td><td>because of</td><td>with</td><td>for, in order to, to</td>'
			+'		</tr>'
			+'		<tr>'
			+'			<td>ἐπί <a target="_blank" href="https://www.blueletterbible.org/lang/lexicon/lexicon.cfm?page=1&strongs=G1909">1909</a></td>'
			+'			<td>up to</td><td>upon, at, on, in, by, before, over</td><td>against, after time of</td><td>&nbsp;</td><td>&nbsp;</td><td>on account of</td><td>&nbsp;</td><td>for</td>'
			+'		</tr>'
			+'		<tr>'
			+'			<td>κατά <a target="_blank" href="https://www.blueletterbible.org/lang/lexicon/lexicon.cfm?page=1&strongs=G2596">2596</a></td>'
			+'			<td>along, down, Upon, throughout</td><td>down, from, upon, at, in, by, before</td><td>according to, with reference to</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>'
			+'		</tr>'
			+'		<tr>'
			+'			<td>μετά <a target="_blank" href="https://www.blueletterbible.org/lang/lexicon/lexicon.cfm?page=1&strongs=G3326">3326</a></td>'
			+'			<td>&nbsp;</td><td>&nbsp;</td><td>After</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>with</td><td>&nbsp;</td>'
			+'		</tr>'
			+'		<tr>'
			+'			<td>παρά <a target="_blank" href="https://www.blueletterbible.org/lang/lexicon/lexicon.cfm?page=1&strongs=G3844">3844</a></td>'
			+'			<td>beyond, to the side of, from</td><td>beside, before</td><td>contrary to</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>with</td><td>&nbsp;</td>'
			+'		</tr>'
			+'		<tr>'
			+'			<td>περί <a target="_blank" href="https://www.blueletterbible.org/lang/lexicon/lexicon.cfm?page=1&strongs=G4012">4012</a>'
			+'			</td><td>around, about</td><td>&nbsp;</td><td>in behalf of, concerning, about</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>with</td><td>&nbsp;</td>'
			+'		</tr>'
			+'		<tr>'
			+'			<td>πρό <a target="_blank" href="https://www.blueletterbible.org/lang/lexicon/lexicon.cfm?page=1&strongs=G4253">4253</a></td>'
			+'			<td>&nbsp;</td><td>before</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>'
			+'		</tr>'
			+'		<tr>'
			+'			<td>πρός <a target="_blank" href="https://www.blueletterbible.org/lang/lexicon/lexicon.cfm?page=1&strongs=G4314">4314</a></td>'
			+'			<td>to, toward </td><td>at, on, beside</td><td>against, for, pertaining to</td><td>&nbsp;</td><td>by means of</td><td>on account of</td><td>with</td><td>for</td>'
			+'		</tr>'
			+'		<tr>'
			+'			<td>σύν <a target="_blank" href="https://www.blueletterbible.org/lang/lexicon/lexicon.cfm?page=1&strongs=G4862">4862</a></td>'
			+'			<td>&nbsp;</td><td>&nbsp;</td><td>besides</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>with</td><td>&nbsp;</td>'
			+'		</tr>'
			+'		<tr>'
			+'			<td>ὑπέρ <a target="_blank" href="https://www.blueletterbible.org/lang/lexicon/lexicon.cfm?page=1&strongs=G5228">5228</a></td>'
			+'			<td>beyond</td><td>over, above</td><td>concerning, for, instead of, on behalf of</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>for the sake of</td>'
			+'		</tr>'
			+'		<tr>'
			+'			<td>ὑπό <a target="_blank" href="https://www.blueletterbible.org/lang/lexicon/lexicon.cfm?page=1&strongs=G5259">5259</a></td>'
			+'			<td>&nbsp;</td><td>under</td><td>&nbsp;</td><td>by</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>'
			+'		</tr>'
			+'	</tbody>'
			+'</table>'
			+'&ldquo;Prepositional Means Classified&rdquo; Page 114 &ldquo;A Manual Grammar of the Greek New Testament&rdquo; by H. E. Dana, J. R. Mantey'
        }
        ,zh:{
			Grammar : "文法"
			, Back : "退回"
			, pageTitle : "字彙分析編碼（Morphology Codes） ： 十大詞態（Parts of Speech）"
			, gotoPronunciation : "（去發音網頁）"
			, Preposition : "介詞(Preposition)"
			, Conjunction : "連接詞(Conjunction)"
			, parTicle : "助詞(parTicle)"
			, Interjection : "感嘆詞(Interjection)"
			, adverB : "副詞(adverB)"
			, Degree : "級別(Degree)"
			, pRonoun : "代名詞(pRonoun)"
        	, Personal : "人稱(Personal)"
        	, person1 : "第一"
        	, person2 : "第二"
        	, person3 : "第三"
        	, Relative : "連接(Relative)"
        	, Demonstrative : "指示(Demonstrative)"
        	, interroGative : "疑問(interroGative)"
        	, Indefinite : "不定(Indefinite)"
        	, inTensive : "強調(inTensive)"
        	, refleXive : "反身(refleXive)"
        	, reCiprocal : "相互(reCiprocal)"
        	, poSessive : "所有格(poSessive)"
        	, correlative : "相關(correlative)"
        	, Gender : "性"
        	, Case : "格"
        	, Number : "數"
        	, Degree : "級別(只為副詞)"
        	, Nominative : "主格(Nominative)"
        	, Masculine : "陽性(Masculine)"
        	, Singular : "單數(Singular)"
        	, Comparative : "比較級(Comparative)"
        	, Genitive : "所有格(Genitive)"
        	, Feminine : "陰性(Feminine)"
        	, Plural : "複數(Plural)"
        	, Superlative : "最高級(Superlative)"
        	, Dative : "間接受格(Dative)"
        	, Neuter : "中性(Neuter)"
        	, Accusative : "直接受格(Accusative)"
        	, Vocative : "呼格(Vocative)"
        	, indeclinable : "不變(indeclinable)"
			, Noun : "名詞(Noun)"
        	, Definitearticle : "定冠詞(Definite article)"
        	, Adjective : "形容詞(Adjective)"
        	, Verb : "動詞(Verb)"
        	, Mode : "語氣(Mode)"
        	, Tense : "時態(Tense)"
        	, Voice : "語態(Voice)"
        	, Indicative : "直說(Indicative)"
        	, Present : "現在式(Present)"
        	, Active : "主動(Active)"
        	, iMperative : "命令(iMperative)"
        	, Imperfect : "不完成式(Imperfect)"
        	, Middle : "關身(Middle)"
        	, Subjunctive : "假設(Subjunctive)"
        	, Future : "未來式(Future)"
        	, Passive : "被動(Passive)"
        	, Optative : "期待(Optative)"
        	, Aorist : "不定過去式(Aorist)"
        	, mid_pass : "關身/被動"
        	, none : "無"
        	, perfect : "完成(perfect)"
        	, Participle : "分詞(Participle)"
        	, pLuperfect : "過去完成(pLuperfect)"
        	, ParticipleExt : "+ (分詞後面加+格Case 性Gender 數Number)"
        	, ModeExpl : "說話者表達自己對於動作實現的不同期待，只包括前四項。。"
        	, IndicativeExpl : "表達一件確定的事實。"
        	, iMperativeExpl : "給聽話者的命令或指示。"
        	, SubjunctiveExpl : "表達一件可能、但不太確定會發生的動作。"
        	, OptativeExpl : "期待某一動作的發生。"
        	, iNfinitiveExpl : "「動作的名詞」(verbal noun)，兼具動詞和名詞的文法特性。"
        	, ParticipleExpl : "動詞帶同主詞當作形容詞、副詞或名詞使用。"
        	, indeclinableExpl : "多為外來語。"

        	, iNfinitive : "不定詞(iNfinitive)"
        	, TenseExpl : "指動作發生的時間"
        	, PresentExpl : "持續到現在的動作"
        	, ImperfectExpl : "說話者認為是一個過去發生、且持續進行到將來的動作，可翻譯成「一直」。"
        	, FutureExpl : "可以表示「將來」。可翻譯成「必」，「將」"
        	, AoristExpl : "過去某一時間點發生過一次的動作；不重時間，重在動作本身，可翻譯成「曾」，「有過」"
			, perfectExpl : "說話者認為當時一個已經完成動作，現在仍然持續影響，未來是否繼續沒有說明，可翻譯成「已經」。"
			, pLuperfectExpl : "說話者認為「過去」一個已經完成動作，現在仍然持續影響，意思與完成時態類似。"
			, VoiceExpl : "指動詞和受詞的關系。"
        	, ActiveExpl : "主詞加動作於受詞。"
        	, MiddleExpl : "主詞主動加動作於受詞，翻譯時可在動詞前加上「自己」、「親自」。"
        	, PassiveExpl : "受詞加動作於主詞，翻譯時可在動詞前加上「被」。"
			, mid_passExpl : "關身或被動，常被翻譯成主動。"
        	, noteVerb : "註：這裡用英文字母為各種詞態的代號。"
        	, NominativeExpl : "動作的發起者"
        	, GenitiveExpl : "是「誰的」、「屬誰」、「關於誰」的意思。"
        	, DativeExpl : "動作的間接對象，或受到動作影響的人物。"
        	, AccusativeExpl : "動作的主要對象，或最先受到動作影響的人物。"
        	, VocativeExpl : "是為了讓人注意。"
        	, noteNoun : "名詞不表示任何形式的行為，或情緒。"
			, PrepositionHtml :
			'<div class="gramma">'
			+'	<b >介系詞：</b>會因為後面跟著的名詞詞性而有不同翻譯。'
			+'	<table class="borderTbl"><tbody>'
			+'		<tr><td></td><td>直接受格</td><td>間接受格</td><td>所有格</td></tr>'
			+'		<tr><td>ἀνά'
			+'				<a target="_blank" href="http://bible.fhl.net/new/s.php?N=0&m=&k=303">303</a></td>'
			+'				<td>之上，向上，依照（數字）,每個</td><td></td><td></td></tr>'
			+'		<tr><td>ἀντί'
			+'				<a target="_blank" href="http://bible.fhl.net/new/s.php?N=0&m=&k=473">473</a></td>'
			+'				<td></td><td></td><td>代替，為，反</td></tr>'
			+'		<tr><td>ἀπό'
			+'				<a target="_blank" href="http://bible.fhl.net/new/s.php?N=0&m=&k=575">575</a></td>'
			+'				<td></td><td></td><td>從…而來</td></tr>'
			+'		<tr><td>διά'
			+'				<a target="_blank" href="http://bible.fhl.net/new/s.php?N=0&m=&k=1223">1223</a></td>'
			+'				<td>因為</td><td></td><td>藉著，通過</td></tr>'
			+'		<tr><td>εἰς'
			+'				<a target="_blank" href="http://bible.fhl.net/new/s.php?N=0&m=&k=1519">1519</a></td>'
			+'				<td>進入、直到</td><td></td><td></td></tr>'
			+'		<tr><td>ἐκ'
			+'				<a target="_blank" href="http://bible.fhl.net/new/s.php?N=0&m=&k=1537">1537</a></td>'
			+'				<td></td><td></td><td>從…出來、脫離、之中、因為</td></tr>'
			+'		<tr><td>ἐν'
			+'				<a target="_blank" href="http://bible.fhl.net/new/s.php?N=0&m=&k=1722">1722</a></td>'
			+'				<td></td><td>在…裡面，藉著、穿</td><td></td></tr>'
			+'		<tr><td>ἐπί'
			+'				<a target="_blank" href="http://bible.fhl.net/new/s.php?N=0&m=&k=1909">1909</a></td>'
			+'				<td>對著、在…裡或之中</td><td>旁邊</td><td>在…上面</td></tr>'
			+'		<tr><td>κατά'
			+'				<a target="_blank" href="http://bible.fhl.net/new/s.php?N=0&m=&k=2596">2596</a></td>'
			+'				<td>對抗、根據</td><td></td><td></td></tr>'
			+'		<tr><td>μετά'
			+'				<a target="_blank" href="http://bible.fhl.net/new/s.php?N=0&m=&k=3326">3326</a></td>'
			+'				<td>之後</td><td></td><td>與…一起</td></tr>'
			+'		<tr><td>παρά'
			+'				<a target="_blank" href="http://bible.fhl.net/new/s.php?N=0&m=&k=3844">3844</a></td>'
			+'				<td>並行</td><td>之旁</td><td>從誰而來</td></tr>'
			+'		<tr><td>περί'
			+'				<a target="_blank" href="http://bible.fhl.net/new/s.php?N=0&m=&k=4012">4012</a></td>'
			+'				<td>周圍</td><td></td><td>關於</td></tr>'
			+'		<tr><td>πρό'
			+'				<a target="_blank" href="http://bible.fhl.net/new/s.php?N=0&m=&k=4253">4253</a></td>'
			+'				<td></td><td></td><td>在…之前</td></tr>'
			+'		<tr><td>πρός'
			+'				<a target="_blank" href="http://bible.fhl.net/new/s.php?N=0&m=&k=4314">4314</a></td>'
			+'				<td>向著，到…那裡</td><td>圍繞</td><td></td></tr>'
			+'		<tr><td>σύν'
			+'				<a target="_blank" href="http://bible.fhl.net/new/s.php?N=0&m=&k=4862">4862</a></td>'
			+'				<td></td><td>與…一起</td><td></td></tr>'
			+'		<tr><td>ὑπέρ'
			+'				<a target="_blank" href="http://bible.fhl.net/new/s.php?N=0&m=&k=5228">5228</a></td>'
			+'				<td>之上</td><td></td><td>為了</td></tr>'
			+'		<tr><td>ὑπό'
			+'				<a target="_blank" href="http://bible.fhl.net/new/s.php?N=0&m=&k=5259">5259</a></td>'
			+'				<td>之下</td><td></td><td>藉著（所），</td></tr>'
			+'	</tbody></table>'
			+'	<img border="0" src="greekpict.GIF" width="433" height="441" align="left">'
			+'</div>'
		}
	}
var translArr = {
        en:{
			Settings : "Settings"
			, FindText : "Find Text"
			, Words : "word(s)"
			, FoundVerses : "Found Verse(s)"
			, History : "History"
			, None : "None"
			, Actions : "Actions"
			, ChooseAction : "Choose an action"
			, Grammar : "Grammar"
			, PreviousChapter : "Previous Chapter"
			, NextChapter : "Next Chapter"
			, ParalletView : "Parallel View"
			, Interlinear : "Interlinear"
			, Back : "Back"
			, Language : "Language:"
			, book : "Book:"
			, chapter : "Chapter:"
			, verse : "Verse:"
			, Go_to_Verse : "Go to Verse"
			, Arrange_display_layout : "Arrange display layout:"
			, Show_new_setting : "Apply"
			, Line1 : "Line1"
        	, Line2 : "Line2"
        	, Line3 : "Line3"
        	, Line4 : "Line4"
        	, Line5 : "Line5"
        	, Line6 : "Line6"
        	, Line7 : "Line7"
        	, Line8 : "Line8"
        	, Line9 : "Line9"
        	, Line10 : "Line10"
        	, Line11 : "Line11"
        	, Line12 : "Line12"
        }
        ,zh:{
			Settings : "設定"
			, FindText : "經文查詢"
			, Words : "關鍵字串"
			, FoundVerses : "相關經節"
			, History : "已讀經節"
			, None : "無"
			, Actions : "選項"
			, ChooseAction : "選擇下一頁面"
			, Grammar : "文法"
			, PreviousChapter : "前一章"
			, NextChapter : "下一章"
			, ParalletView : "平行對照"
			, Interlinear : "希語逐字對照"
			, Back : "退回"
			, Language : "語言:"
			, book : "書名:"
			, chapter : "章數:"
			, verse : "節數:"
			, Go_to_Verse : "顯示經文"
			, Arrange_display_layout : "設定顯示順序:"
        	, Show_new_setting : "顯示新設定"
			, Line1 : "第一行"
			, Line2 : "第二行"
			, Line3 : "第三行"
			, Line4 : "第四行"
			, Line5 : "第五行"
			, Line6 : "第六行"
			, Line7 : "第七行"
			, Line8 : "第八行"
			, Line9 : "第九行"
			, Line10 : "第十行"
        	, Line11 : "第十一行"
        	, Line12 : "第十二行"
        }
    };
function Lang(language, tranA){
    var Languages = tranA;
    // GENERAL SETTINGS
    var LANG_CURRENT = "en";
    if(language == 'C')
		LANG_CURRENT = "zh";

    var LANG_DEFAULT = 'en';

    /**
     * All the html elements with this attributes are translated on the fly
     */
    var LANG_ATTRIBUTE_NAME = "uilang"
	var LANG_HTML_NAME = "uihtml"

    /**
     * key è la chiave da usare nell'oggetto LANG
     * @param key
     */
    this.get = function(key){
        return Languages[LANG_CURRENT][key] || Languages[LANG_DEFAULT][key];
    }

    /**
     * Cerco tutti gli elementi che hanno una certa classe
     */
    this.searchAndReplace = function(){
        var me = this;
        var divs = $('*[' + LANG_ATTRIBUTE_NAME + ']');
        $.each(divs,function(indx,item){
            item = $(item);
            var txt = me.get(item.attr(LANG_ATTRIBUTE_NAME));
            item.text( txt);
        });
        var html = $('*[' + LANG_HTML_NAME + ']');
        $.each(html,function(indx,item){
            item = $(item);
            var txt = me.get(item.attr(LANG_HTML_NAME));
            item.html( txt);
        });
    }
    this.setLanguage = function(language, replaceText){
        LANG_CURRENT = language;
        if(replaceText){
            this.searchAndReplace();
        }
    }
    this.searchAndReplace();
}
var toGr=
   "αααααααααααααααα"
 + "εεεεεε  εεεεεε  "  
 + "ηηηηηηηηηηηηηηηη"
 + "ιιιιιιιιιιιιιιιι"
 + "οοοοοο  οοοοοο  "
 + "υυυυυυυυ υ υ υ υ"
 + "ωωωωωωωωωωωωωωωω"
 + "ααεεηηιιοουυωω  "
 + "αααααααααααααααα"
 + "ηηηηηηηηηηηηηηηη"
 + "ωωωωωωωωωωωωωωωω"
 + "ααααα ααααααα   "
 + "  ηηη ηηηηηηη   "
 + "ιιιι  ιιιιιι    "
 + "υυυυρρυυυυυυρ   "
 + "  ωωω ωωωωωωω   ";
var orgGr=
   "ἀἁἂἃἄἅἆἇἈἉἊἋἌἍἎἏ"
 + "ἐἑἒἓἔἕ  ἘἙἚἛἜἝ  "
 + "ἠἡἢἣἤἥἦἧἨἩἪἫἬἭἮἯ"
 + "ἰἱἲἳἴἵἶἷἸἹἺἻἼἽἾἿ"
 + "ὀὁὂὃὄὅ  ὈὉὊὋὌὍ  "
 + "ὐὑὒὓὔὕὖὗ Ὑ Ὓ Ὕ Ὗ"
 + "ὠὡὢὣὤὥὦὧὨὩὪὫὬὭὮὯ"
 + "ὰάὲέὴήὶίὸόὺύὼώ  "
 + "ᾀᾁᾂᾃᾄᾅᾆᾇᾈᾉᾊᾋᾌᾍᾎᾏ"
 + "ᾐᾑᾒᾓᾔᾕᾖᾗᾘᾙᾚᾛᾜᾝᾞᾟ"
 + "ᾠᾡᾢᾣᾤᾥᾦᾧᾨᾩᾪᾫᾬᾭᾮᾯ"
 + "ᾰᾱᾲᾳᾴ ᾶᾷᾸᾹᾺΆᾼ᾽ι᾿"
 + "῀῁ῂῃῄ ῆῇῈΈῊΉῌ῍῎῏"
 + "ῐῑῒΐ  ῖῗῘῙῚΊ ῝῞῟"
 + "ῠῡῢΰῤῥῦῧῨῩῪΎῬ῭΅`"
 + "  ῲῳῴ ῶῷῸΌῺΏῼ´῾ ";
function polyG2monoG( txt){
	var ret = "";
	for( var i=0; i < txt.length; i++){
		 var ch = txt.charAt(i);
		 if( txt.charCodeAt(i) >= 0x1F00){
		 	var idx = orgGr.indexOf( ch);
		 	if( idx > -1){
				ch = toGr.charAt(idx);
			}
		 	
		 }
		 ret += ch;
	}
	return ret;
}
var synth;
function speakOff(){
	if( typeof synth !== "undefined")
		synth.cancel();
}
function speakGr( txt) {
	var outTxt = polyG2monoG( txt);
	if( outTxt.length == 0)
		return;
	var utterThis = new SpeechSynthesisUtterance(outTxt);
	if( typeof synth === "undefined"){
		if( typeof ASpeechSynthesis !== "undefined")
    	    synth = new ASpeechSynthesis();
    	else
    	    synth = window.speechSynthesis;
    }
    var voices = synth.getVoices();
	try{
		//out = "";
		for(i = 0; i < voices.length ; i++) {
			//out+=voices[i].lang+"\n";
			console.log(voices[i].lang);
			if(voices[i].lang=="el-GR" || voices[i].lang=="el_GR"){
				utterThis.rate = 0.6
				//utterThis.voice = voices[i];
				utterThis.lang = voices[i].lang;
				synth.speak(utterThis);
				//alert("Speak done.");
				return;
			}
		};
		if( typeof IsAndroid == 'undefined')
    		alert( "Your OS do not support Greek Text to speech!");
    	else
    		alert( "You need install 'Google Text-to-Speech' to support Greek Text to speech!");
	}catch( err){
		alert( "exception:"+err);
		return;
	}
}