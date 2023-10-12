
var adminPermissionsMap = null;
var isSuperAdmin = false;
function getPermissionForUrl(url) {
  try {
    if(!url) return false;
    url = url.split('?')[0].toLocaleLowerCase();
    if(isSuperAdmin) return true;
    if(!adminPermissionsMap || !adminPermissionsMap.slug) return false;
    return adminPermissionsMap.slug[url] ? true : false;
  } catch(error) {
    return false;
  }
}

// function getPermissionForVariable(key) {
//   try {
//     if(!key) return null;
//     if(!adminPermissionsMap || !adminPermissionsMap.variable) return null;
//     return adminPermissionsMap.variable[key] ? adminPermissionsMap.variable[key] : null;
//   } catch(error) {
//     return null;
//   }
// }

function getPermissionForVariableUrl(key, ...urls) {
  try {
    if(!key) return false;
    key = key.toLocaleLowerCase();
    if(isSuperAdmin) return true;
    if(!adminPermissionsMap || !adminPermissionsMap.variable) return false;
    let permission = adminPermissionsMap.variable[key] ? true : false;
    if(!permission) return false;
    if(urls && urls.length) {
      for(let i = 0; i < urls.length; i++) {
        if(!getPermissionForUrl(urls[i])) return false;
      }
    }
    return permission;
  } catch (error) {
    return false;
  }
}

function setAdminPermissionUrlMap() {
  try {
    let elem = document.getElementById('main-adminuserid-id'); 
    if(!elem || !elem.value) return;
    let adminId = elem.value;
    if(!adminId) return;
    let superAdminElem = document.getElementById('main-superadmin-id');
    if(superAdminElem && superAdminElem.value == '1') isSuperAdmin = true;
    let permissionObj = atob(localStorage.getItem('PERMISSION_ADMIN_'+adminId));
    if(permissionObj) {
      try {
        permissionObj = JSON.parse(permissionObj);
      } catch (error) {}
    }   
    let permissionArr = permissionObj;
    if(!permissionArr || permissionArr.length == 0) return;
    let obj = {
      slug : {},
      variable : {}
    };
    for(let permission of permissionObj) {
      if(permission.slug && ['header_url','url_without_header'].indexOf(permission.type) >= 0) {
        obj.slug[permission.slug.toLocaleLowerCase()] = permission;
      }
      if(permission.v_key) {
        obj.variable[permission.v_key.toLocaleLowerCase()] = permission;
      }
    }
    adminPermissionsMap = obj;
  } catch(error) {
    console.log(error);
  }
}

setAdminPermissionUrlMap();


function getAdminPermission() {
  let adminElem = document.getElementById('main-adminuserid-id');
  if(!adminElem || !adminElem.value) return null;
  let adminId = adminElem.value;
  let permissionObj = atob(localStorage.getItem('PERMISSION_ADMIN_'+adminId));
  if(permissionObj) {
    try {
      permissionObj = JSON.parse(permissionObj);
    } catch (error) {}
  }   
  return  permissionObj;
}

function createHeaderList() {
  let subMenuToggleElem = document.getElementById('subMenuToggle');
  if(subMenuToggleElem) subMenuToggleElem.style.display = 'none';
  let permissionObj = getAdminPermission();
  if(!permissionObj || permissionObj.length == 0) return;
  permissionObj.sort((a, b) => a.display_order - b.display_order);
  let ulElem = document.getElementsByClassName('admin-header-ul');
  if(!ulElem || ulElem.length == 0) return;
  let parentHeaderInfo = {id : 0};
  let urlWithoutHeaderMap = {};
  let headerList = [];
  //let subHeaderList = [];
  let currentSubHeaderUrlMap = {};
  for(let permission of permissionObj) {
    if(permission.type == 'header_url' && permission.parent_id == 0 && permission.header_label) {
      headerList.push(permission);
    }

    if(permission.type == 'header_url' && permission.parent_id != 0 && permission.header_label && permission.slug) {
        if(currentSubHeaderUrlMap[permission.parent_id] == undefined) currentSubHeaderUrlMap[permission.parent_id] = [];
        currentSubHeaderUrlMap[permission.parent_id].push(permission);
    }   
    
    if(permission.type == 'url_without_header' && permission.parent_id && permission.slug) {
      if(urlWithoutHeaderMap[permission.parent_id] === undefined) urlWithoutHeaderMap[permission.parent_id] = [];
      urlWithoutHeaderMap[permission.parent_id].push(permission.slug);
    }
    
  }

  createMainHeaderList(headerList, currentSubHeaderUrlMap, urlWithoutHeaderMap, parentHeaderInfo);
  
  let url = window.location.pathname;
  if(url) url = url.toLocaleLowerCase();
  if(url != '/' && url != '/admin/admindashboard' && parentHeaderInfo.id != 0) {
    createSubHeaderList(permissionObj, urlWithoutHeaderMap, parentHeaderInfo);
  }

}

function createMainHeaderList(headerList, currentSubHeaderUrlMap, urlWithoutHeaderMap, parentHeaderInfo) {
  let ulElem = document.getElementsByClassName('admin-header-ul');
  if(ulElem && ulElem.length) ulElem = ulElem[0];
  let url = window.location.pathname;
  if(url) url = url.toLocaleLowerCase();
  
  if(!headerList || headerList.length == 0) return;
  
  
  if(ulElem) {
    for(let permission of headerList) {
      let headerLabel = permission.header_label;
      let li = document.createElement("li");
      let addActiveClass = false;
      if(permission.slug && url.startsWith(permission.slug.toLocaleLowerCase())) addActiveClass = true;
      if(!addActiveClass && urlWithoutHeaderMap[permission.id]) {
        urlWithoutHeaderMap[permission.id].forEach(slug => {
           if(url.startsWith(slug.toLocaleLowerCase())) {
              addActiveClass = true;
           } 
        });
      }

      if(addActiveClass) {
        li.classList.add("active");
      } else {
        if(currentSubHeaderUrlMap[permission.id]) {
          for(let subHeaderPermission of currentSubHeaderUrlMap[permission.id]) {
            let subHeaderSlug = subHeaderPermission.slug;
            if(url && url.startsWith(subHeaderSlug.toLocaleLowerCase()) && addActiveClass == false) {
              addActiveClass = true;
              //permission.slug = subHeaderSlug;
              parentHeaderInfo.id = permission.id;
            }      
            if(!permission.slug) {
              permission.slug = subHeaderSlug;
            }
            if(!addActiveClass && urlWithoutHeaderMap[subHeaderPermission.id]) {
              urlWithoutHeaderMap[subHeaderPermission.id].forEach(slug => {
                 if(url.startsWith(slug.toLocaleLowerCase())) {
                    addActiveClass = true;
                    parentHeaderInfo.id = permission.id;
                 } 
              });
            }   
            if(addActiveClass && permission.slug) break;
          }
        }
        if(addActiveClass) {
          li.classList.add("active");
        }
      }          
      let atag = document.createElement('a');
      atag.setAttribute('href', permission.slug);
      atag.innerText = headerLabel;
      li.appendChild(atag);
      ulElem.appendChild(li);
    }
  }
}

function createSubHeaderList(permissionObj, urlWithoutHeaderMap, parentHeaderInfo) {
  let ulElem = document.getElementsByClassName('subAdmin-header-ul');
  if(ulElem && ulElem.length) ulElem = ulElem[0];
  
  let subHeaderMap = {};
  for(let permission of permissionObj) {
    if(permission.type == 'header_url' && permission.parent_id != 0 && permission.header_label && parentHeaderInfo.id == permission.parent_id) {
      subHeaderMap[permission.header_label] = permission;
    }
  }
  
  if(Object.keys(subHeaderMap).length === 0) return;
  let url = window.location.pathname;
  if(url) url = url.toLocaleLowerCase();
  if(ulElem) {
    let gocidElem = document.getElementById('subadmin-header-gocid');
    let gameidEle = document.getElementById('subadmin-header-gameid');

    let gocid = gocidElem && gocidElem.value || '';
    let gameid = gameidEle && gameidEle.value || '';
    for(let headerLabel in subHeaderMap) {
      let permission = subHeaderMap[headerLabel];
      let li = document.createElement("li");
      let addActiveClass = false;
      if(permission.slug && url.startsWith(permission.slug.toLocaleLowerCase())) addActiveClass = true;
      if(!addActiveClass && urlWithoutHeaderMap[permission.id]) {
        urlWithoutHeaderMap[permission.id].forEach(slug => {
           if(url.startsWith(slug.toLocaleLowerCase())) {
              addActiveClass = true;
           } 
        });
      }
      if(addActiveClass) li.classList.add("active");

      let atag = document.createElement('a');
      let slugUrl = permission.slug + (gocid ? '?gocid='+gocid : (gameid ? '?game_id=' + gameid : ''));
      atag.setAttribute('href',slugUrl);
      atag.innerText = headerLabel;
      li.appendChild(atag);
      ulElem.appendChild(li);
    }
  }  
  let subMenuToggleElem = document.getElementById('subMenuToggle');
  if(subMenuToggleElem) subMenuToggleElem.style.display = '';
  //$("#subMenuToggle").show();    
}

createHeaderList();