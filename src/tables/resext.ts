export const Resexts = [
  'ERR',
  'BMP',
  'MVE',
  'WAV',
  'WFX',
  'PLT',
  'TGA',
  'BAM',
  'WED',
  'CHU',
  'TIS',
  'MOS',
  'ITM',
  'SPL',
  'BCS',
  'IDS',
  'CRE',
  'ARE',
  'DLG',
  '2DA',
  'GAM',
  'STO',
  'WMP',
  'EFF',
  'BS',
  'CHR',
  'VVC',
  'VEF',
  'PRO',
  'BIO',
  'WBM',
  'FNT',
  'GUI',
  'SQL',
  'PVR',
  'GLS',
  'TOT',
  'TOH',
  'MEN',
  'LUA',
  'TTF',
  'PNG',
  'BAH',
  'INI',
  'SRC',
  'MAZ',
  'MUS',
  'ACM',
] as const;

export type Resext = (typeof Resexts)[number];

export type ResextTable = Record<number, Resext>;

export const resextTable: ResextTable = {
  0: 'ERR',
  1: 'BMP',
  2: 'MVE',
  4: 'WAV',
  5: 'WFX',
  6: 'PLT',
  952: 'TGA',
  1000: 'BAM',
  1001: 'WED',
  1002: 'CHU',
  1003: 'TIS',
  1004: 'MOS',
  1005: 'ITM',
  1006: 'SPL',
  1007: 'BCS',
  1008: 'IDS',
  1009: 'CRE',
  1010: 'ARE',
  1011: 'DLG',
  1012: '2DA',
  1013: 'GAM',
  1014: 'STO',
  1015: 'WMP',
  1016: 'EFF',
  1017: 'BS',
  1018: 'CHR',
  1019: 'VVC',
  1020: 'VEF',
  1021: 'PRO',
  1022: 'BIO',
  1023: 'WBM',
  1024: 'FNT',
  1026: 'GUI',
  1027: 'SQL',
  1028: 'PVR',
  1029: 'GLS',
  1030: 'TOT',
  1031: 'TOH',
  1032: 'MEN',
  1033: 'LUA',
  1034: 'TTF',
  1035: 'PNG',
  1100: 'BAH',
  2050: 'INI',
  2051: 'SRC',
  2052: 'MAZ',
  4094: 'MUS',
  4095: 'ACM',
};
