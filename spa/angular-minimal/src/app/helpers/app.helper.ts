import { environment } from '../../environments/environment';

export function getLanguages(): string[] {
  return environment.languages;
}

export function getCurrentLanguage() : string {
  const languages = getLanguages();

  for (let i = 0; i < languages.length; i++) {
    const language = languages[i];

    if (new RegExp('/' + language + '($|/)').test(window.location.pathname)) {
      return language;
    }
  }

  return languages[0];
}

export function removeCurrentLanguage(path: string, currentLanguage: string): string {
  return path.replace(new RegExp('/' + currentLanguage + '($|/)'), '/');
}

export function changeLanguage(newLanguage: string): void {
  const nodeName = environment.rootPath;
  const languages = getLanguages();
  let pathname = window.location.pathname;
  const currentLanguage = getCurrentLanguage();
  pathname = removeCurrentLanguage(pathname, currentLanguage);

  if (languages[0] !== newLanguage) {
    if (pathname.indexOf(nodeName) > -1) {
      pathname = pathname.replace(new RegExp(nodeName), '/' + newLanguage + nodeName);
    } else {
      pathname = '/' + newLanguage + pathname;
    }
  }

  window.location.href = window.location.origin + pathname + window.location.search;
}

export function getRouterBasename(): string {
  const nodeName = environment.rootPath;
  const languages = getLanguages();
  let pathname = window.location.pathname;

  if (pathname.indexOf(nodeName) > -1) {
    return pathname.replace(new RegExp(nodeName + '.*'), '') + nodeName;
  }

  const currentLanguage = getCurrentLanguage();

  return languages[0] === currentLanguage ? '/' : '/' + currentLanguage;
}

export function getVersion(path: string): string {
  return new URLSearchParams(path).get('mgnlVersion');
}
