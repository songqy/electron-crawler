import { SET_MENUS, SET_FILES, SET_IMGS } from './mutationTypes';
import { ActionTree } from 'vuex';
import { RootState, ViewPhotoState, Menu, Img } from '../../interface';
import { File, FilesAndParent } from '@/main/interface';
import config from '@/main/config';


const fileDir = config.fileDir;


// 判断是否文件夹
const isDir = (path: string) => {
  return !path.match(/\./g);
};

// 判断是否图片
const isImg = (path: string) => {
  return path.match(/(.png|.jpg)$/g);
};


const parseMenus = (files: File[], index = ''): Menu[] => {
  if (!files || files.length <= 0) {
    return [];
  }
  return files.map(file => {
    const _index =  `${index}/${file.filePath}`;
    const children = parseMenus(file.children, _index);
    const newMenu: Menu = {
      value: file.filePath,
      label: file.filePath,
      index: _index,
      children,
      hasChildren: children && children.length > 0 && isDir(children[0].value),
    };
    return newMenu;
  });
};


const appendFiles = (prevFiles: File[], files: File[], parent: string): File[] => {
  if (parent === '/') {
    return files;
  }
  let target: File | undefined, parentFiles = prevFiles;
  const values = parent.split('/').slice(1);
  values.forEach((value, ind) => {
    if (ind > 0 && target) {
      parentFiles = target.children;
    }
    target = parentFiles.find(file => file.filePath === value);
  });
  if (target) {
    target.children = files;
  }

  return prevFiles;
};


const getImgList = (files: File[], values: string[]): File[] => {
  let target: File | undefined, parentFiles = files;
  values.forEach((value, ind) => {
    if (ind > 0 && target) {
      parentFiles = target.children;
    }
    target = parentFiles.find(file => file.filePath === value);
  });
  if (target?.children && target?.children.length > 0 && isImg(target.children[0].filePath)) {
    return target.children;
  }
  return [];
};


const parseImgs = (files: File[], parent: string): Img[] => {
  let imgName = files.map(v => v.filePath);
  imgName = imgName.filter(v => v.match(/img\d+.*/g));

  const imgs: Img[] = imgName.map(img => {
    return {
      src: `${fileDir}/${parent}/${img}`,
      index: parseInt(img.slice(3)),
    };
  });

  imgs.sort((a, b) => {
    return a.index - b.index;
  });

  return imgs;
};


const actions: ActionTree<ViewPhotoState, RootState> = {
  /** 更新Menu */
  refreshMenus({ commit, state, dispatch }, data: FilesAndParent): void {
    const { files, parent } = data;
    const newFiles = appendFiles(state.files, files, parent);
    const menus = parseMenus(newFiles);
    commit(SET_MENUS, menus);
    commit(SET_FILES, newFiles);
    dispatch('refreshImgs', parent);
  },

  refreshImgs({ commit, state }, parent: string): void {
    if (parent === '/') return;
    const values = parent.split('/').slice(1);
    const imgList = getImgList(state.files, values);
    if (imgList) {
      const imgs = parseImgs(imgList, parent);
      commit(SET_IMGS, imgs);
      // 滚动条回到顶部
      const imgDiv = document.getElementById('imgContent');
      if (imgDiv) {
        imgDiv.scrollTop = 0;
      }
    }
  },
};

export default actions;
