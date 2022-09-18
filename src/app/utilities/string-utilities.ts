export function limitWithEllipsis(str: string, limit: number): string {
  if (str.length > limit) {
    return str.slice(0, limit - 1) + '...';
  } else {
    return str;
  }
}
