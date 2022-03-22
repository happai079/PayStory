package com.AourZ.PayStory.service.accountBook;

import java.util.ArrayList;
import java.util.HashMap;

import com.AourZ.PayStory.model.accountBook.AccountBookBudgetVO;
import com.AourZ.PayStory.model.accountBook.AccountBookVO;
import com.AourZ.PayStory.model.accountBook.EditorVO;
import com.AourZ.PayStory.model.accountBook.ExpenditureItemVO;
import com.AourZ.PayStory.model.accountBook.ExpenditureVO;
import com.AourZ.PayStory.model.accountBook.IncomeVO;
import com.AourZ.PayStory.model.accountBook.ShareAccountBookVO;
import com.AourZ.PayStory.model.accountBook.TagTotalVO;
import com.AourZ.PayStory.model.board.BoardVO;
import com.AourZ.PayStory.model.member.MemberVO;

public interface IAccountBookService {
	void createMyAccountBook(String memberNo);															// 일반 가계부 생성
	AccountBookVO selectAccountBook(String condition, Object value, boolean isShared);	// 가계부 조회
	void updateAccountBook(int accountBookNo, String title, String describe);					// 가계부 수정
	AccountBookBudgetVO selectAccountBookBudget(int accountBookNo, String date);		// 가계부 예산 조회
	void insertAccountBookBudget(int accountBookNo, String date, int budget);					// 가계부 예산 추가
	void updateAccountBookBudget(int accountBookNo, String date, int budget);				// 가계부 예산 수정
	ArrayList<ShareAccountBookVO> selectShareMemberList(int accountBookNo);				// 공유 가계부 소유자, 참여자 조회
	
	MemberVO selectMemberInfo(String condition, Object value);								// 회원 정보 조회
	
	IncomeVO selectIncome(int accountBookNo, String dataNo);				// 수입 내역 조회 (단일)
	ExpenditureVO selectExpenditure(int accountBookNo, String dataNo);	// 지출 내역 조회 (단일)
	
	ArrayList<IncomeVO> selectIncomeList(int accountBookNo, String date);				// 수입 내역 조회
	ArrayList<ExpenditureVO> selectExpenditureList(int accountBookNo, String date);	// 지출 내역 조회
	ArrayList<ExpenditureItemVO> selectExpenditureItem(int expenditureNo);				// 지출 상세 항목 조회
	ArrayList<TagTotalVO> selectAccountBookTotalDataList(String condition, int accountBookNo, String group1, String group2,
			String date, String dateForm);						// 수입 / 지출 총 건수, 총 금액
	String selectTagInfo(String condition, String tag);		// 태그 이름 조회
	
	void deleteItem(String condition, int dataNo);			// 내역 삭제
	void updateItem(HashMap<String, Object> map);	// 내역 수정
	void deleteDetailItem(int expenditureNo);				// 지출 내역 상세 항목 삭제
	
	void insertEditor(String condition, String dataDate, String memberNo, int accountBookNo, int dataNo);	// 내역 수정자 추가
	void updateDataDate(String condition, String dataDate, int dataNo);													// 내역 데이터 날짜 수정
	ArrayList<Integer> selectEditorDataNoList(String condition, int accountBookNo, String date);				// 내역 수정 데이터 번호 조회
	ArrayList<EditorVO> selectEditorList(String condition, int accountBookNo, int dataNo);							// 내역 수정자 조회
	
	ArrayList<BoardVO> selectBoardList(int boardTab, String boardCategoryNo);	// 게시판 게시글 리스트
	String selectBoardCategoryName(String boardCategoryNo);							// 게시판 카테고리 이름 조회
	
	public void insertIncome(IncomeVO vo); // 수입 항목 추가
	public void insertExpenditure(ExpenditureVO vo); // 지출 항목 추가
	public void insertExpenditureItem(ArrayList<ExpenditureItemVO> list); // 지출 아이템 추가
}
