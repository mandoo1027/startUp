<template> 
      <div class="tit_cnt_btn mt_40">
      <p class="tit_cnt" v-if="computedShowOption.isShowCnt">
        조회 <b>{{totalCount}}</b>건,
        지급 금액 합계 <b>10,000,000</b>원
      </p>
      <div>
        <v-btn v-if="computedShowOption.isShowAdd"
          class="vtbn black"
          size="small"
          @click="setData('add')"
        >추가</v-btn>
        <v-btn v-if="computedShowOption.isShowDel"
          class="vtbn black"
          size="small"
          @click="setData('del')"
        >삭제</v-btn>
        <v-btn v-if="computedShowOption.isShowSave"
          class="vtbn black"
          size="small"
          @click="saveData"
        >저장</v-btn>
      </div>
      <div class="a_center">
        <v-btn class="vbtn line" size="small">엑셀 다운로드</v-btn>        
        <CommonComSelectBox v-if="computedShowOption.isShowPageSize" groupCode="01" v-model="comboPageSize" :items="sltitems" :isDefault="false" class="s_basics more none_details" 
        @changeValue="changeValue"
        /> 
      </div>
    </div>
    <div class="grid" :class="showOptions.gridClass"> 
        <ag-grid-vue
          class="ag-theme-alpine"
          :style="styleRef"
          :columnDefs="columnDefs"
          :defaultColDef="computeDefaulColDef"
          :rowSelection="gridOptions.rowSelection"
          :supressRowClickSelection="gridOptions.supressRowClickSelection"
          :singleClickEdit="gridOptions.singleClickEdit"
          :rowDragEntireRow= "gridOptions.rowDragEntireRow"
          :rowDragManaged= "true"
          :animateRows="true"
          :rowHeight="rowHeight" 
          :suppressColumnVirtuallsation="gridOptions.suppressColumnVirtuallsation"
          :localeText="{noRowsToShow:'조회된 데이터가 없습니다.'}"
          
          @cell-clicked="cellWasClicked"
          @cell-focused="cellFocused"
          @grid-ready="onGridReady"
          @cell-value-changed="cellValueChanged"  
        >   
        </ag-grid-vue> 
    </div>
    <div v-if="computedShowOption.isShowMoreBtn && isShowMore && computedShowOption.isChangeSearchData">
      <v-btn class="vbtn btn_grid_more" size="small" @click="moreNextPage">더보기</v-btn>
    </div> 
</template>

<script setup>
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { AgGridVue } from 'ag-grid-vue3' 
import { text } from 'node:stream/consumers';
import { type } from 'os';

const emits = defineEmits(['clickPagingNumber','setPageSize','callSave','cellWasClicked','cellValueChange'])

const props = defineProps({
  columnDefs: {
    type: Array,
    default: [],
  },
  defaultColDef: { type: Object, default: {
      sortable:true, // 정렬기능
      filter:true  , // 필터기능 
      editable:true,//편집 여부
      resizable:true,//모르겠다
      cellStyle:{textAlign:'center'}
    } 
   },
   showOptions:{
    type:Object, //노출여부 
    default:{
      sameChk:'',//체크 조건
      isShowCnt:true,//건수 보여주기
      isShowDel:false,//추가 버튼
      isShowSave:false,//저장 버튼
      isShowPageSize:true,//페이지 사이즈 콤보박스
      isShowMoreBtn:true,//더보기 버튼
      isChangeSearchData:true,//검색 조건 변경시 더보기 노출 여부
      gridClass:'',
      isRadio:false,//라디오 이벤트(체크박스 1건 선택) 여부
    }
   },
   rowHeight:{type:Number , default:51},//로우 높이 
   isShowPaging:{
    type:Boolean,default: false
   },
   style:{
    type:Object,default:{
      height:'553px'
    }
   },
   currentPage:{
    type:Number,default:1
   },
   pageSize:{
    type:Number,default:100
   },
   gridOptions:{
    type:Object,
    default:{
      rowSelection : 'multiple',
      suppressRowClickSelection:false,
      singleClickEdit:true,
      rowDragEntireRow:!$fx.isTablet(),
      rowDragManaged:true,
      animateRows:true,
      copyHeadersToClipboard:true//헤더를 클립보드로 복사
    }
   }, 
})

const totalCount = ref(0)

const sltitems = ref([
  {title:'10개',value:10},
  {title:'20개',value:20},
  {title:'100개',value:100},
])

const gridOption = ref({})
const isShowMore = ref(false)
const comboPageSize = ref(100)

watch(
  ()=> props.pageSize,
  async(newValue,oldValue)=>{
    comboPageSize.value = newValue
  },
  {immediate:true}
)

const computeDefaulColDef = computed(()=>{
  return{
    sortable : props.defaultColDef.sortable ?? true , //정렬기능 
    filter : props.defaultColDef.filter ?? true,//필터 기능
    editable: props.defaultColDef.editable ?? true,//편집여부
    resizable:props.defaultColDef.resizable ?? true , //자동 넓이 조정
    cellStyle: props.defaultColDef.cellStyle ?? {textAlign : 'center'} // 전체 컬럼 정렬
  }
})

const computedShowOption = computed(()=>{
  return{
    isShowCnt : props.showOptions.isShowCnt ?? true, //총건수 노출 여부
    isShowAdd : props.showOptions.isShowAdd ?? false, //추가 버튼
    isShowDel: props.showOptions.isShowDel ?? false, //삭제 버튼
    isShowSave : props.showOptions.isShowSave ?? false , //페이지 사이즈 콤보 박스
    isShowPageSize : props.showOptions.isShowPageSize ?? true,//페이지 사이즈 콤보박스
    isShowMoreBtn : props.showOptions.isShowMoreBtn ?? true,//더보기 버튼
    isChangeSearchData : props.showOptions.isChangeSearchData ??  true , //검색 조건 변경시 더보기 노출 여부
    sameChk: props.showOptions.sameChk ?? '' , //체크 될 때 동일한 값이 있을 경우 모두 체크 되도록 수정
    isRadio : props.showOptions.isRadio ?? false // 라디오 이벤트(체크박스 1건 선택) 여부 
  }
})

const cellWasClicked = (e) => {
  console.log('cellWasClicked:::', e) 
}
const cellFocused = (e) => {
  console.log('cellFocused:::', e)
}
const onGridReady = (e) => {
  gridOption.value = e 
  removeData()
}
const cellValueChanged = (e) => {
  if(e.column.colId !== 'chk' && e.data.rowStatus != 'D' && e.data.rowStatus !== 'C'){
    e.data.rowStatus = 'U'
    const rowData = gridOption.value.api.applyTransaction({update:[e.data]})
    emit('cellValueChange',rowData)
  }else if(e.column.colId === 'chk'){
    if(computedShowOption.value.sameChk){
      setSamechkList(e.data , e.data.chk)
    }else if(computedShowOption.value.isRadio){
      setRadioEvt(e.rowIndex)
    }
  }
  console.log('cellValueChanged:::', e)
}

const setRadioEvt = (rowIndex) =>{
  const targetList = getAllData()
  targetList.splice(rowIndex,1)
  targetList.map((targetRow)=>{
    targetRow.chk = false
    gridOption.value.api.applyTransaction({update:[targetRow]})
  })
}

const setSamechkList = (rowData , isTrue) =>{
  let sameValue = rowData[computedShowOption.value.sameChk]
  //값이 있을 경우 해당 컬럼과 비교하여 동일한 값이 있으면 모두 체크
  const targetList = getAllData()
  const filterList = targetList.filter((item)=>item[computedShowOption.value.sameChk] === sameValue)
  filterList.map((targetRow)=>{
    targetRow.chk = isTrue
    gridOption.value.api.applyTransaction({update:[targetRow]})
  } ) 
}

const moreNextPage = () =>{
  const rowCount = gridOption.value.api.getDisplayedRowCount()
  emit('clickPagingNumber',rowCount)
}

const clickPagingNumber = (number) =>{
  emit('clickPagingNumber',number)
}

const setData = (type) =>{
  //그리드 추가(add), 삭제(del)
  if(type === 'del'){
    const currentRowsC = getAllData()
    const chkData = currentRowsC.find((item) => item.chk === true)
    if(!chkData){
      $fx.throwAlert('삭제할 데이터를 선택하세요.','알림')
      return
    }else{
      //추가된 데이터만 삭제하기
      currentRowsC.map((item)=>{
        if(item.chk === true && item.rowStatus === 'C'){
          gridOption.value.api.applyTransaction({remove : [item]})
        }else if(item.chk === true){
          item.rowStatus = 'D'
          gridOption.value.api.applyTransaction({update : [item]})
        }
      })
    }
  }else{
    gridOption.value.api.applyTransaction({add : [{chk:false,rowStatus:'C'}]})
    movePosition()
  }
}

const getData = () =>{
  const rowDataList = getAllData()
  return rowDataList
}

const getCheckData = () =>{
  const rowData = getAllData()
  const chkDataList = rowData.filter((item)=> item.chk === true)
  return chkDataList
}

// 저장 직전에 편집 상태를 변경하면 현재 로우의 편집 상태를 셋팅함(좋은 방법 있으면 알려줘
const saveRefresh = () =>{
  gridOption.value.api.stopEditing()
}
//저장 버튼 클릭
const saveData = () =>{
  saveRefresh()
  setTimeout(()=>{
    const changeRows = gridOption.value.api.getRenderedNodes().map((node)=>node.data).filter((item)=>item.rowStatus)
    emit('callSave',changeRows)
  },500)
} 

//업무 페이지에서 접근(목록 데이터에 ADD)
const addData = (resultData)=>{
  /** 그리드 최하단으로 이동  */
  movePosition()
  if(resultData.length > 0){
    const setData = resultData.map((item)=>{
      item.chk = false
      item.rowStatus = ''
      return item
    })
    gridOption.value.api.applyTransaction({add:setData})
    //더보기
    if(resultData.length < props.pageSize){
      isShowMore.value = false
    }else{
      isShowMore.value = true
    }
  }else{
    isShowMore.value = false
  }
  props.showOptions.isChangeSearchData = true
  //총 갯수 셋팅
  totalCount.value = gridOption.value.api.getDisplayedRowCount()
}
//그리드 데이터 삭제
const removeData = () =>{
  gridOption.value?.api?.setRowData([])
  totalCount.value = 0
}
const changeValue = (value) =>{
  emit('setPageSize',value)
}
//row클릭시 데이터 가져오기
const getSelectedRows = () =>{
  return gridOption.value.api.getSelectedRows()
}

//row클릭시 데이터 가져오기
const getSelectedRowIndex = () =>{
  const node = gridOption.value.api.getSelectedNodes()
  if(node.length > 0){
    return node[0].rowIndex
  }
  return -1
}

const getUpdateList = () =>{
  const allData = gridOption.value.api.getModel().rowsToDisplay.map((node)=>node.data)
  const updateList = allData.filter(
    (item)=> item.rowStatus === 'D' || item.rowStatus === 'C' || item.rowStatus === 'U'
  )
  return updateList
}

//신규 데이터 생성
const addRowData = (data) =>{
  const initData = {chk:false,rowStatus:'C'}
  const addData = Object.assign({},initData,data)
  gridOption.value.api.applyTransaction({add:[addData]})
  movePosition()
}

//해당 위치로 이동
const movePosition = (params = {index : undefined , isActionClick : false})=>{
  if(!params.index){
    params.index = gridOption.value.api.getDisplayedRowCount() - 1
  }
  const lastIndex = params.index
  if(lastIndex > -1){
    const rowNode = gridOption.value.api.getDisplayedRowAtIndex(lastIndex)
    rowNode.setSelected(true,true)//true(셀렉트 시키기),true(기존에 셀렉트 헤제하기)
    if(params.isActionClick){
      emit('cellWasClicked',rowNode)//강제로 데이터 내리기
    }
    gridOption.value.api.ensureIndexVisible(lastIndex,'bottom')//해당 인덱스로 이동
  }
}

const getTotalCount = () =>{
  const totalCnt = gridOption.value.api.getDisplayedRowCount()
  return totalCnt
}

defineExpose({
  gridOption,
  addData,
  removeData,
  getData,
  getCheckData,
  getSelectedRows,
  setData,
  getSelectedRowIndex,
  getUpdateList,
  addRowData,
  movePosition,
  getTotalCount
})
</script>
