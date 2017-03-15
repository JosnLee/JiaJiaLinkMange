import {Component, Input} from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './page.html',
  styleUrls: ['./pagelist.css']
})
export class PaginationDirective {

  pageList:Array<any> = [];

  constructor() {
  }

  @Input('conf') conf:any = {
    currentPage: 1,
    numberOfPages: 10,
    itemsPerPage: 10,
    totalItems: 0,
    perPageOptions: [10, 20, 30, 40, 50],
    pagesLength: 9,
    jumpPageNum: 1

  };

  selectChange(value) {
    this.conf.itemsPerPage = value;
    if (this.conf.onChange) {
      this.conf.onChange();
    }

  }

  // prevPage
  prevPage() {
    if (this.conf.currentPage > 1) {
      this.conf.currentPage -= 1;
    }
    if (this.conf.onChange) {
      this.conf.onChange();
    }
  };

  // nextPage
  nextPage() {
    if (this.conf.currentPage < this.conf.numberOfPages) {
      this.conf.currentPage += 1;
    }
    if (this.conf.onChange) {
      this.conf.onChange();
    }
  };


  changeCurrentPage(item) {
    if (item == '...') {
      return;
    } else {
      this.conf.currentPage = item;
    }
    this.conf.onChange();

  };

  jumpPageBlur(number) {
    this.conf.currentPage = number;
    if (this.conf.onChange) {
      this.conf.onChange();
    }
  }


  // pageList数组
  getPagination() {

    // conf.currentPage
    this.conf.currentPage = parseInt(this.conf.currentPage) ? parseInt(this.conf.currentPage) : 1;

    // conf.totalItems
    this.conf.totalItems = parseInt(this.conf.totalItems) ? parseInt(this.conf.totalItems) : 0;

    // conf.itemsPerPage (default:15)
    this.conf.itemsPerPage = parseInt(this.conf.itemsPerPage) ? parseInt(this.conf.itemsPerPage) : 15;

    // numberOfPages
    this.conf.numberOfPages = Math.ceil(this.conf.totalItems / this.conf.itemsPerPage);

    // judge currentPage > this.numberOfPages
    if (this.conf.currentPage < 1) {
      this.conf.currentPage = 1;
    }

    // 如果分页总数>0，并且当前页大于分页总数
    // if(this.conf.numberOfPages > 0 && this.conf.currentPage > this.conf.numberOfPages){
    //    this.conf.currentPage = this.conf.numberOfPages;
    // }
    this.conf.jumpPageNum = this.conf.currentPage;


    // 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
    var perPageOptionsLength = this.conf.perPageOptions ? this.conf.perPageOptions.length : 0;
    // 定义状态
    var perPageOptionsStatus;
    for (var i = 0; i < perPageOptionsLength; i++) {
      if (this.conf.perPageOptions[i] == this.conf.itemsPerPage) {
        perPageOptionsStatus = true;
      }
    }
    // 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
    if (!perPageOptionsStatus) {
      this.conf.perPageOptions ? this.conf.perPageOptions.push(this.conf.itemsPerPage) : this.conf.perPageOptions = [10, 20, 30, 40, 50];
    }

    // 对选项进行sort
    this.conf.perPageOptions.sort(function (a, b) {
      return a - b
    });

    this.pageList = [];
    if (this.conf.numberOfPages <= this.conf.pagesLength) {
      // 判断总页数如果小于等于分页的长度，若小于则直接显示
      for (let i = 1; i <= this.conf.numberOfPages; i++) {
        this.pageList.push(i);
      }
    } else {
      // 总页数大于分页长度（此时分为三种情况：1.左边没有...2.右边没有...3.左右都有...）
      // 计算中心偏移量
      var offset = (this.conf.pagesLength - 1) / 2;
      if (this.conf.currentPage <= offset) {
        // 左边没有...
        for (i = 1; i <= offset + 1; i++) {
          this.pageList.push(i);
        }
        this.pageList.push('...');
        this.pageList.push(this.conf.numberOfPages);
      } else if (this.conf.currentPage > this.conf.numberOfPages - offset) {
        this.pageList.push(1);
        this.pageList.push('...');
        for (i = offset + 1; i >= 1; i--) {
          this.pageList.push(this.conf.numberOfPages - i);
        }
        this.pageList.push(this.conf.numberOfPages);
      } else {
        // 最后一种情况，两边都有...
        this.pageList.push(1);
        this.pageList.push('...');

        for (i = Math.ceil(offset / 2); i >= 1; i--) {
          this.pageList.push(this.conf.currentPage - i);
        }
        this.pageList.push(this.conf.currentPage);
        for (i = 1; i <= offset / 2; i++) {
          this.pageList.push(this.conf.currentPage + i);
        }

        this.pageList.push('...');
        this.pageList.push(this.conf.numberOfPages);
      }
    }


  }

  ngOnChanges(changeRecord) {


  }

  ngDoCheck(aa) {
    this.getPagination()
  }


  ngOnInit() {


  }


}
