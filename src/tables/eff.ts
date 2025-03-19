import _ from 'lodash';

export type EffTab = typeof effTab;

export type EffKey = keyof EffTab;

export type EffValue = EffTab[keyof EffTab];

export const effTab = {
  0: 'AC vs damage type modifier',
  1: 'APR modifier',
  2: 'Cure sleep',
  3: 'Berserking',
  4: 'Cure berserking',
  5: 'Charm',
  6: 'Charisma modifier',
  7: 'Set character colours by palette',
  8: 'Change by RGB',
  9: 'Glow pulse',
  10: 'Constitution modifier',
  11: 'Cure poison',
  12: 'HP damage',
  13: 'Instant death',
  14: 'Defrost',
  15: 'Dexterity modifier',
  16: 'Haste',
  17: 'Current HP modifier',
  18: 'Maximum HP modifier',
  19: 'Intelligence modifier',
  20: 'Invisibility',
  21: 'Lore modifier',
  22: 'Cumulative luck bonus',
  23: 'Morale modifier',
  24: 'Horror',
  25: 'Poison',
  26: 'Remove curse',
  27: 'Acid resistance modifier',
  28: 'Cold resistance modifier',
  29: 'Electricity resistance modifier',
  30: 'Fire resistance modifier',
  31: 'Magic damage resistance modifier',
  32: 'Cure death raise dead',
  33: 'Save vs Death modifier',
  34: 'Save vs Wands modifier',
  35: 'Save vs Petrification or Polymorph modifier',
  36: 'Save vs breath weapons modifier',
  37: 'Save vs spells modifier',
  38: 'Silence',
  39: 'Unconsciousness',
  40: 'Slow',
  41: 'Sparkle',
  42: 'Wizard spell slots modifier',
  43: 'Cure stone to flesh',
  44: 'Strength modifier',
  45: 'Stun',
  46: 'Cure stun unstun',
  47: 'Cure invisibility',
  48: 'Cure silence vocalize',
  49: 'Wisdom modifier',
  50: 'Glow by RGB brief',
  51: 'Strong or dark by RGB',
  52: 'Very bright by RGB',
  53: 'Animation change',
  54: 'THAC0 modifier',
  55: 'Kill creature type',
  56: 'Alignment invert',
  57: 'Alignment change',
  58: 'Dispell effects',
  59: 'Stealth modifier',
  60: 'Miscast magic',
  61: 'Creature RGB color fade',
  62: 'Priest spell slots modifier',
  63: 'Infravision',
  64: 'Remove infravision',
  65: 'Overlay blur',
  66: 'Transparency fade',
  67: 'creature summoning',
  68: 'Unsummon creature',
  69: 'Protection from detection non-detection',
  70: 'Cure non-detection',
  71: 'Sex change',
  72: 'Set IDS state',
  73: 'Extra damage modifier',
  74: 'Blindness',
  75: 'Cure blindness',
  76: 'Feeblemindedness',
  77: 'Cure feeblemindedness',
  78: 'Disease',
  79: 'Cure disease',
  80: 'Deafness',
  81: 'Cure deafness',
  82: 'Set AI script',
  83: 'Protection from projectile',
  84: 'Magical fire resistance modifier',
  85: 'Magical cold resistance modifier',
  86: 'Slashing resistance modifier',
  87: 'Crushing resistance modifier',
  88: 'Piercing resistance modifier',
  89: 'Missiles resistance modifier',
  90: 'Open locks modifier',
  91: 'Find traps modifier',
  92: 'Pick pockets modifier',
  93: 'Fatigue modifier',
  94: 'Drunkenness modifier',
  95: 'Tracking skill modifier',
  96: 'Level change',
  97: 'Exceptional strength modifier',
  98: 'HP regeneration',
  99: 'Duration modifier',
  100: 'Protection from creature type',
  101: 'Protection from opcode',
  102: 'Immunity by power level',
  103: 'change name',
  104: 'Experience points',
  105: 'Gold',
  106: 'Morale break modifier',
  107: 'Portrait change',
  108: 'Reputation',
  109: 'Paralyze',
  111: 'Create magical weapon',
  112: 'Remove item',
  114: 'Dither',
  115: 'Detect alignment',
  116: 'Cure invisibility',
  117: 'Reveal area',
  119: 'Mirror image',
  120: 'Protection from weapons',
  122: 'Create inventory item',
  123: 'Remove inventory item',
  124: 'Teleport dimension door',
  125: 'Unlock knock',
  126: 'Movement modifier',
  127: 'Monster summoning',
  128: 'Confusion',
  129: 'Aid',
  130: 'Bless',
  131: 'Positive chant',
  132: 'Raise strength, constitution and dexterity non-cumulative',
  133: 'Luck non-cumulative',
  134: 'Petrification',
  135: 'Polymorph into specific',
  136: 'Force visible',
  137: 'Negative chant',
  138: 'Character animation change',
  139: 'display string',
  140: 'Casting glow',
  141: 'Lighting effects',
  142: 'Display special effect icon',
  143: 'Create item in slot',
  144: 'Disable button',
  145: 'Disable spell casting abilities',
  146: 'Cast spell at creature',
  147: 'Learn spell',
  148: 'Cast spell at point',
  149: 'Identify',
  150: 'Find traps',
  151: 'Replace creature',
  152: 'Play movie',
  153: 'Overlay sanctuary',
  154: 'Overlay entangle',
  155: 'Overlay minor globe',
  156: 'Overlay protection from normal missiles cylinder',
  157: 'Web effect',
  158: 'Overlay grease',
  159: 'Mirror image exact number',
  160: 'Remove sanctuary',
  161: 'Cure horror',
  162: 'Cure hold',
  163: 'Protection free action',
  164: 'Cure drunkeness',
  165: 'Pause target',
  166: 'Magic resistance modifier',
  167: 'THAC0 modifier with missile weapons',
  168: 'Remove creature',
  169: 'Prevent special effect icon',
  170: 'Play damage animation',
  171: 'Give ability',
  172: 'Remove spell',
  173: 'Poison resistance modifier',
  174: 'Play sound effect',
  175: 'Hold',
  176: 'Movement modifier II',
  177: 'Use EFF file',
  178: 'THAC0 vs creature type modifier',
  179: 'Damage vs creature type modifier',
  180: "Can't use item",
  181: "Can't use item type",
  182: 'Apply effect item',
  183: 'Apply effect itemtype',
  184: "Passwall don't jump",
  185: 'Hold II',
  186: 'Move to area',
  187: 'Store local variable',
  188: 'Aura cleansing',
  189: 'Casting time modifier',
  190: 'Attack speed factor',
  191: 'Casting level modifier',
  192: 'Find familiar',
  193: 'Invisible detection by script',
  194: 'Ignore dialog pause',
  195: 'Death dependent constitution loss familiar bond',
  196: 'Familiar block',
  197: 'Bounce by impact projectile',
  198: 'Bounce by opcode',
  199: 'Bounce by power level',
  200: 'Bounce by power level decrementing',
  201: 'Immunity by power level decrementing',
  202: 'Bounce by school',
  203: 'Bounce by secondary type',
  204: 'Protection by school',
  205: 'Protection by secondary type',
  206: 'Protection from spell',
  207: 'Bounce by resource',
  208: 'HP minimum limit',
  209: 'Kill 60HP',
  210: 'Stun 90HP',
  211: 'Imprisonment',
  212: 'Protection freedom',
  213: 'Maze',
  214: 'Select spell',
  215: 'Play 3D effect',
  216: 'Level drain',
  217: 'Unconsciousness 20HP',
  218: 'Protection stoneskin',
  219: 'AC vs creature type modifier',
  220: 'Remove school',
  221: 'Remove secondary type',
  222: 'Teleport field',
  223: 'Immunity by school decrementing',
  224: 'Cure level drain restoration',
  225: 'Reveal magic',
  226: 'Immunity by secondary type decrementing',
  227: 'Bounce by school decrementing',
  228: 'Bounce by secondary type decrementing',
  229: 'Remove one school',
  230: 'Remove one secondary type',
  231: 'Timestop',
  232: 'Castspell on condition',
  233: 'Proficiency modifier',
  234: 'Contingency creation',
  235: 'Wing buffet',
  236: 'Image projection',
  237: 'Puppet ID',
  238: 'Disintegrate',
  239: 'Farsight',
  240: 'Remove special effect icon',
  241: 'Charm control creature',
  242: 'Cure confusion',
  243: 'Drain item charges',
  244: 'Drain wizard spell',
  245: 'Check for berserk',
  246: 'Berserking',
  247: 'Attack nearest creature',
  248: 'Set melee effect',
  249: 'Set ranged effect',
  250: 'Damage modifier',
  251: 'Change bard song effect',
  252: 'Set trap',
  253: 'Add map marker',
  254: 'Remove map marker',
  255: 'Create inventory item days',
  256: 'Spell sequencer active',
  257: 'Spell sequencer creation',
  258: 'Spell sequencer activation',
  259: 'Protection spelltrap by power level decrementing',
  260: 'Spell sequencer activation2',
  261: 'Restore lost spells',
  262: 'Visual range',
  263: 'Backstab',
  264: 'Drop weapons in panic',
  265: 'Modify global variable',
  266: 'Remove protection from spell',
  267: 'Protection from display specific string',
  268: 'Clear fog of war wizard eye',
  269: 'Shake Window',
  270: 'Cure unpause target',
  271: 'Avatar removal',
  272: 'Apply repeating EFF',
  273: 'Remove specific area effect zone of sweet air',
  274: 'Teleport to target',
  275: 'Hide in shadows modifier',
  276: 'Detect illusion modifier',
  277: 'Set traps modifier',
  278: 'To-hit modifier',
  279: 'Enable button',
  280: 'Wild magic',
  281: 'Wild magic',
  282: 'Scripting state modifier',
  283: 'Use EFF file cursed',
  284: 'Melee THAC0 modifier',
  285: 'Melee weapon damage modifier',
  286: 'Missile weapon damage modifier',
  287: 'Selection circle removal',
  288: 'Fist THAC0 modifier',
  289: 'Fist damage modifier',
  290: 'Change title',
  291: 'Disable visual effect',
  292: 'Protection backstab',
  293: 'Enable offscreen AI',
  294: 'Existance delay override',
  295: 'Disable permanent death',
  296: 'Protection from specific animation',
  297: 'Immunity to turn undead',
  298: 'Execute script cut250a',
  299: 'Chaos shield',
  300: 'NPC bump',
  301: 'Critical hit modifier',
  302: 'Can use any item',
  303: 'Backstab every hit',
  304: 'Mass raise dead',
  305: 'THAC0 modifier offhand',
  306: 'THAC0 modifier main hand',
  307: 'Ranger tracking ability',
  308: 'Protection from tracking',
  309: 'Modify local variable',
  310: 'Protection from timestop',
  311: 'Random wish spell',
  312: 'Crash',
  313: 'HighLevel ability denotation',
  314: 'Golem stoneskin',
  315: 'Animation removal',
  316: 'Magical rest',
  317: 'Haste 2',
  318: 'Protection from resource',
  319: 'Usability item usability',
  320: 'Change weather',
  321: 'Effects specified by resource',
  323: 'Turn undead level',
  324: 'Protection immunity to resource and message',
  325: 'Saves vs all',
  326: 'Apply effects list',
  327: 'Icewind visual spell hit plays sound',
  328: 'Set state',
  329: 'Slow poison',
  330: 'Float text',
  331: 'Random monster summoning',
  332: 'Specific damage modifier',
  333: 'Static charge',
  334: 'Turn undead',
  335: 'Seven eyes',
  336: 'Display eyes overlay',
  337: 'Remove opcode',
  338: 'Disable rest',
  339: 'Alter animation',
  340: 'Change backstab effect',
  341: 'Change critical hit effect',
  342: 'Animation override data',
  343: 'HP swap',
  344: 'Enchantment vs creature type',
  345: 'Enchantment bonus',
  346: 'Save vs school bonus',
  360: 'Ignore reputation breaking point',
  361: 'Cast spell on critical miss',
  362: 'Critical miss bonus',
  363: 'Modal state check',
  365: 'Make unselectable',
  366: 'Apply Spell on move',
  367: 'Minimum base stats',
} as const;

export const EffKeys = _.keys(effTab);

export const EffValues = _.values(effTab);
