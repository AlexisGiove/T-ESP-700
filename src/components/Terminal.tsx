import { useState, useEffect, useRef } from 'react'
import { TerminalLine, CommandHandler } from '../types'

const Terminal = () => {
  const [history, setHistory] = useState<TerminalLine[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Logo ASCII art - Version détaillée avec motifs de circuit
  const getLogo = () => [
    '',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠀⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡅⠀⠀⠀⠀⠀⠀⠀⡄⠀⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⡌⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡜⣰⠀⠀⠆⠀⠀⢀⠌⡄⡌⠁⠀⠀⠠⠁⠀⠀⠀⢀⠜⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣄⠚⡔⢣⠀⡰⢀⡀⠴⣡⠚⠠⠀⠀⢀⡐⠃⠀⢀⡄⠎⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⢀⢰⠸⡤⠋⡠⢧⠹⡔⢫⠜⣱⢂⡭⢄⠲⣌⢣⠜⡰⡘⢦⢈⡀⠄⠒⠀⠀⠀⠀⠀⠀⡀⠄⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⢀⠀⠀⠀⢀⠠⣐⠎⡜⡈⡱⡘⡕⡱⢌⠳⣌⠧⢪⠑⠮⠔⠎⠳⡜⣬⠚⣥⡙⢆⡣⢜⢣⠒⣆⠲⡐⢆⢣⠃⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢑⠦⡠⢄⠤⣀⢖⡰⣊⠬⡓⣌⠦⣈⠲⣡⠃⠜⠂⢉⠠⠀⠄⠂⠄⢂⠐⡀⠂⠄⢀⠉⡐⠪⠱⣌⢣⢎⡹⣐⠣⡝⣠⢀⠀⠀⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠑⢎⠲⡡⢎⠴⣡⠣⣕⠪⠜⠀⡁⠀⠄⠂⠌⡀⠂⠡⢈⠐⠈⡀⠂⠄⠁⢂⠀⠂⠄⠂⡁⠀⡉⠂⠵⣈⠳⣘⠤⣋⢜⡡⢆⣀⣀⢂⡔⠲⠈⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠐⠢⠔⢲⡐⠮⣌⢣⡑⢎⡲⠅⠃⠠⢀⠂⡐⠠⠁⠌⠐⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠈⠐⢀⠂⠄⠁⠐⡈⠄⡈⠑⢬⡑⠪⡆⣙⠆⠶⣈⠒⣈⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⣐⠣⡜⢣⠜⣢⠙⠈⡀⠐⡈⠐⡀⠂⠄⠁⠀⠀⠀⠀⠀⠂⠁⠀⠂⠁⠀⠀⠀⠂⠀⠀⠀⠀⠀⠌⠠⢁⠠⠀⠐⠈⡀⠘⢅⠎⡰⢌⠥⠡⠓⢆⣒⠲⠌⠃⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠠⢀⡀⣀⢀⡀⡥⢰⣉⠦⡙⣌⢣⠚⠀⠠⠁⠄⠡⢀⠡⠐⠀⠀⠀⠀⠀⠀⠈⣀⢠⡔⠤⠀⠀⠀⠈⠀⡀⠀⠁⠀⠄⠀⠀⠀⠂⠠⠁⠌⠀⠀⡀⠀⠉⡖⢢⡙⢤⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠈⠀⢉⡐⡣⢜⢢⡙⡄⠃⠁⠌⠠⠁⡌⢐⠠⠂⠀⠀⠠⠀⠁⠀⡀⠀⠀⠉⠃⠀⠀⡀⢀⠂⠁⠀⠈⠀⠠⠀⠐⠈⠀⠀⠁⡈⠐⡈⠄⠀⢂⠐⠈⢣⠜⣢⢙⠢⢄⡀⠄⠀⠀⠀⣀⠠⠐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠠⢁⡔⢎⠲⣉⠎⠂⠁⠠⡀⢁⡈⠤⠑⡠⠊⡄⠁⠂⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠂⠀⠀⠠⠐⠈⠀⠂⠀⠀⡀⠀⠀⠀⠀⠠⠁⠄⠂⡁⠀⠌⠐⡀⠳⢄⢋⠖⡠⣘⡈⠣⠙⠂⠁⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢁⠠⠊⢠⡘⣌⠳⠀⢠⠈⠄⢁⠐⡄⠢⢌⠱⡠⢃⠄⠀⠀⠀⠈⠀⢀⠀⠀⠀⠀⠂⠀⠀⡀⠀⠂⠀⠀⠀⠀⠀⠀⠀⡀⠄⠀⠀⡡⢈⠀⠠⠈⠄⠀⠐⡀⠫⢄⢫⠔⣡⠆⡄⠁⠁⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠠⠀⡀⡍⢦⠱⡌⠁⡈⠄⢈⠐⡄⠣⡔⢡⢊⡥⣓⢎⠀⠀⠀⢀⠀⠄⠀⢀⠈⠀⠁⠀⠀⠄⠀⠀⠀⡀⠈⠀⠀⡀⠁⢀⠀⠁⠀⠀⠀⠀⠰⢡⠈⡄⠁⠂⠄⠂⠠⠀⣋⠦⡙⡔⢪⠔⡢⢄⡀⣀⢀⡀⠄⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⠁⠤⠒⢭⠒⡍⠆⠃⠠⠀⠐⢀⠢⢁⠨⡑⡩⢆⣏⠲⡍⡞⠀⠀⠀⠀⠀⢀⠠⠀⠀⠌⠀⠀⠀⡀⠀⠠⠀⠀⠀⠄⢁⣀⠀⠀⠀⠂⠀⠁⠀⠀⣳⢢⢅⡘⠤⠈⠐⡈⠄⠁⢀⠎⡱⢜⡡⠊⠑⠒⠘⠐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠠⠐⡠⢔⢪⠑⡈⠐⠌⠠⠁⠐⠠⡐⠌⡂⡼⣱⢫⡜⣣⠝⡼⡀⠀⠠⠀⠈⠀⠀⠠⠀⠀⠁⠀⠀⠀⠀⠄⠀⠐⠀⡐⠀⠀⠐⠀⠀⠀⠀⠀⡐⠀⡭⣕⠺⣜⢢⠁⡂⠀⠂⠄⡂⢖⠨⡐⠡⠋⠤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠠⢁⠂⡔⢪⠔⠉⠤⡘⠤⢁⠘⡀⢀⠈⠥⡐⠡⢘⡱⢣⠳⡜⢥⢫⡕⢣⠀⠀⡀⠄⠐⠀⠀⠀⠀⠀⢀⠲⠄⠤⠠⢄⠰⢀⠐⠌⠁⠠⢀⠀⠀⠂⠀⠀⢰⡱⢎⡝⢮⢣⢇⠄⡀⢁⠤⠉⠢⡑⢬⢡⠡⣄⠠⣁⢀⡀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠌⡐⠀⠎⢌⠡⢌⡘⡡⠜⡰⠡⡐⠰⠀⢂⠑⡈⢅⠨⣕⢫⣓⡹⢎⡣⢞⡱⣂⠐⠀⡀⠀⠀⠀⡀⠀⠁⠆⠀⠌⢘⠀⢃⠂⠎⠀⠄⠀⠀⠀⠀⠀⢀⠀⢀⠶⣙⠮⣜⣣⠯⣜⠠⢀⢃⡌⡲⢍⠭⣰⣃⠳⠌⠳⠄⠆⠜⡠⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠌⠀⠀⠤⣉⠦⣑⠪⡔⣡⢣⡑⢣⠱⣡⢋⡔⡢⢄⡒⠄⢩⠖⣥⢛⡬⢳⣍⢳⢭⣆⡐⠀⠐⠀⠐⠀⠀⠀⡀⠀⠀⠄⠈⠀⠅⡐⠈⠀⠀⠁⠀⠠⠀⠂⣠⢋⡞⣥⢛⡴⢣⡝⠢⣠⢒⠵⣊⡥⢖⡭⢤⣀⡀⠂⠁⠀⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠐⠀⡈⠀⢂⡀⠄⢁⠓⡨⠄⢣⡘⠥⠓⠦⠳⠸⠡⢏⡜⡲⣄⠛⡴⣋⣜⢣⢎⢧⡛⡼⡰⣄⠀⠤⠁⠀⢀⠀⠀⠀⠀⠀⠀⠐⠀⠐⠄⠀⠄⢀⠌⠀⢀⡴⣃⠯⡜⢦⢫⡜⢣⣊⡞⢴⡋⠞⠁⣀⠢⢀⠌⠁⠈⠂⠄⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠈⢀⠀⠐⠀⠀⠍⠂⠘⠀⠐⠂⠘⠤⣁⢂⠡⢆⠳⡐⠎⣑⠪⢛⣦⢕⡮⣙⢎⠮⣕⢣⡽⢢⠳⣄⣀⠀⠀⠠⠁⠈⠀⠀⠀⡄⠐⠀⠐⠡⠈⢂⡤⣊⠷⡸⢥⡛⣜⢧⣳⡝⣯⢷⣙⡫⠖⠞⠤⠆⣅⠂⠀⠠⠁⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠂⠐⠠⠀⠀⡀⠌⠀⠅⠢⢑⠦⣉⠧⢬⡑⠫⡷⣮⣗⣮⢳⣜⢫⡝⢦⣋⢾⡱⢆⡤⣄⣁⣀⣈⡐⢬⠤⣔⡲⢭⢳⡼⣡⢟⡹⣖⡽⣞⢧⣳⢫⠓⠦⡛⠍⡑⠨⠐⡄⠂⡌⠑⠠⠐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠈⠠⠐⠀⠠⠀⡀⠀⠀⠄⠂⠥⠀⢊⡐⠭⡒⠭⣓⠬⣝⢾⣿⣿⣞⡷⣚⣧⣹⢶⣙⢮⡵⣚⢦⡳⢎⡵⣫⢞⡼⣱⣏⣷⣺⣽⣾⢿⣭⢷⣛⡚⠐⠣⠍⡒⠡⠘⡠⢁⠢⠸⡷⠌⢠⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠠⠥⠀⠀⠈⠀⠀⠀⡁⠂⠔⣂⠈⡑⢎⡳⢣⠟⣰⢒⢦⡝⣿⠾⣿⣿⡿⣿⣿⡿⣿⢿⣿⡿⣿⣿⣿⣿⠿⠿⣛⢯⢣⠳⡜⢆⢦⡹⣙⠒⠦⢤⣁⠤⡰⢀⠣⡑⢠⠈⢂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠐⠈⠐⠄⡊⠄⠑⠢⢄⢂⠱⣄⢫⢄⠏⡼⣡⢏⠶⣩⡗⣻⢼⣿⣝⡳⣎⢿⣹⡛⣯⡝⣎⢣⢲⡣⢍⠜⢢⠝⢪⡑⢭⠚⣤⢓⡬⣙⣪⡶⣌⠇⠡⢊⠀⡔⡡⢊⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⡈⢒⠤⡠⠜⡄⢆⣣⠘⡜⢲⢱⣊⠳⣥⢋⠷⣿⣷⢫⣷⣽⡾⣥⢛⡴⡹⣌⠇⣣⠱⣋⠖⡥⢛⠴⣈⠢⡋⡴⢃⠒⠥⠎⡑⢄⢲⡑⢃⠰⠌⠡⠀⠌⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⠧⡑⠫⣜⣃⣼⣸⡜⣣⠦⣉⠳⡌⡍⢞⡹⣌⠳⣌⢳⡙⠶⡩⢖⡱⢪⡙⡤⢣⡜⢮⡱⢫⡜⡡⠏⠐⢄⠂⡅⢒⠨⠰⡌⣔⢫⠣⡑⠠⠀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⡁⢎⠴⣊⢳⡘⠥⢎⠥⡓⡜⡸⢜⢢⠇⡏⢖⡣⢞⡱⢍⠶⡡⢇⢣⢳⡡⢾⣟⡱⠣⢈⠔⡨⢑⠠⠀⡘⢄⠣⠑⡌⡐⢂⠡⢀⠁⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡌⢲⠡⢆⡹⡘⢤⢃⡜⠰⣁⠊⠦⠙⡜⢬⠒⡥⢊⢇⠮⣑⢎⢣⠣⡝⡲⠬⣁⠶⣁⠸⠀⠁⠢⡘⠌⢂⠅⠠⡀⠅⢂⠐⠀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡄⠀⠀⠀⠀⠀⠀⠀⠀⠘⢤⢋⠦⡱⣉⢆⠣⡜⡱⢂⠡⠌⠓⣌⢣⡙⡤⢍⢎⠶⣩⠎⣡⠣⠱⡁⢾⠯⠀⡍⠢⢀⠂⠅⡐⠠⠂⠌⡁⠐⡈⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢂⠇⣎⠱⡌⢎⡱⢜⡡⢋⠦⡙⠦⢌⠲⣡⡙⣬⢚⡻⣷⡛⢤⠃⢃⠱⢀⢂⠒⡈⢁⠂⠌⡐⠠⠁⠌⡐⠠⠁⠀⠀⠀⠀⠀⠐⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢎⡔⢣⠜⡢⢕⠪⡜⡱⢊⠵⣉⢎⡱⢢⢱⢂⠯⡜⢆⠭⢒⡉⢄⠎⡄⢂⠐⠄⠂⠌⡐⠠⠁⠌⠐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⢊⠴⡘⡌⢎⡱⢊⡱⢌⡱⣉⠖⡡⢎⡔⢣⠎⠌⠐⠔⡄⠚⢠⠉⡌⠠⠐⠠⠈⠄⡁⢂⠐⠠⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢈⢆⡱⡘⢦⢡⠣⡜⢢⠱⣌⠪⠱⡌⡜⡡⠎⢐⠂⢢⠐⢁⠀⠆⡐⠠⢁⠂⡁⢂⠐⠠⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢨⢐⢢⢉⣆⢣⠓⣌⢣⠓⣤⢋⣵⢘⣄⡃⢠⢁⠊⡔⢠⡈⠀⡄⡐⢀⠂⡐⢀⠂⡌⢀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡘⠤⡘⠜⣌⠻⡩⠈⡘⢡⠛⡼⣈⡜⠁⢀⠌⠛⠀⡄⢃⠘⠠⠁⠌⠠⠁⠌⠘⢀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢣⠘⡐⠠⢃⠅⠣⠄⠠⡙⠤⢣⠜⠀⠊⠄⠠⠡⠐⠠⠈⠄⠡⠈⠄⠁⢂⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢆⠱⣀⠀⠃⡌⠱⠈⡡⠄⢃⠌⡒⠤⠁⠠⠑⠠⢁⠂⠡⠈⠄⠁⠌⠀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡉⠄⠒⡤⢂⠁⠄⡡⠒⠠⠈⠄⢂⠘⡐⠀⠁⠌⡐⠠⠈⠄⠡⠐⠈⢀⠐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢈⠒⠠⠌⢢⠐⠀⢁⠂⠡⠈⠄⠂⠄⡀⠛⠀⠀⠄⡁⠂⠄⠂⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠤⠑⠂⡅⢂⠠⠈⠄⠡⢈⠐⠠⠐⠀⡀⠐⠠⠀⠐⠀⡀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢈⠰⢀⠡⠘⡄⢂⠁⢈⠐⠀⠠⠁⠠⠁⠠⠈⠀⠀⠁⡀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢂⠐⢂⠡⠘⡀⠀⠠⠐⠈⢀⠂⠁⡀⠁⠀⠀⠀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠌⡀⢂⠡⠐⠈⠁⠀⠠⠀⠀⠂⠀⠠⠐⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠠⠐⡀⠐⠈⠠⠐⠀⠁⠐⣠⠀⠀⠀⠀⡀⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⠠⠀⠡⠀⠁⡀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⠀⠀⡁⢂⠀⠠⠐⠀⠀⠀⠀⠀⠀⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠠⠐⠀⡈⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⠠⠁⠀⠄⠀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⠈⠀⢀⠐⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠀⠀⡀⠁⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⡀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
    '',
    '            ██████╗ ██████╗  ██████╗  ██████╗ ███████╗',
    '            ██╔══██╗██╔══██╗██╔═══██╗██╔════╝ ██╔════╝',
    '            ██████╔╝██████╔╝██║   ██║██║  ███╗███████╗',
    '            ██╔══██╗██╔══██╗██║   ██║██║   ██║╚════██║',
    '            ██║  ██║██║  ██║╚██████╔╝╚██████╔╝███████║',
    '            ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝',
    '',
    '                 Analyse Prédictive par IA',
    '                    Open Source Project',
    '',
  ]

  // Commandes disponibles
  const commands: Record<string, CommandHandler> = {
    help: () => [
      'Commandes disponibles:',
      '',
      '  help       - Affiche cette liste de commandes',
      '  logo       - Affiche le logo ARGOS',
      '  about      - Informations sur ARGOS',
      '  usecases   - Cas d\'usage de la plateforme',
      '  ethics     - Charte éthique',
      '  team       - Équipe et recrutement',
      '  roadmap    - Feuille de route du projet',
      '  contact    - Informations de contact',
      '  clear      - Efface l\'historique du terminal',
    ],
    logo: () => getLogo(),
    about: () => [
      'ARGOS est une plateforme open-source d\'analyse prédictive.',
      'Elle agrège en temps réel des données publiques et anonymisées',
      'pour détecter des signaux faibles et anticiper des événements critiques.',
      '',
      'L\'objectif : offrir un outil transparent, éthique et utile',
      'pour l\'aide à la décision.',
    ],
    usecases: () => [
      'Cas d\'usage ARGOS:',
      '',
      '1. Anticipation de rupture de stock',
      '   Analyse des actualités industrielles et logistiques pour',
      '   détecter des risques de pénurie sur des composants critiques.',
      '',
      '2. Détection d\'émergence de cyberattaques',
      '   Surveillance des signaux techniques et discussions spécialisées',
      '   pour identifier des menaces avant leur déploiement.',
      '',
      '3. Prévision de pic de trafic',
      '   Croisement d\'événements publics et d\'annonces pour',
      '   anticiper les pics de fréquentation sur les réseaux de transport.',
      '',
      '4. Analyse de tendances économiques',
      '   Agrégation de données open data pour identifier des',
      '   signaux faibles dans les secteurs économiques.',
    ],
    ethics: () => [
      'Charte éthique ARGOS:',
      '',
      '✓ Données publiques uniquement',
      '  Aucune collecte de données privées ou confidentielles.',
      '',
      '✓ Aucune donnée personnelle nominative',
      '  Respect strict de l\'anonymisation et de la vie privée.',
      '',
      '✓ Code open-source',
      '  Transparence totale sur les algorithmes et traitements.',
      '',
      '✓ Objectif : aide à la décision',
      '  ARGOS est un outil d\'analyse, pas un système de surveillance.',
    ],
    team: () => [
      'Équipe ARGOS',
      '',
      'Nous cherchons des profils IA, data, back-end, cybersécurité,',
      'UI/UX pour construire ARGOS sur 4 semestres.',
      '',
      'Rejoignez-nous pour travailler sur:',
      '  • Big Data et traitement de flux',
      '  • NLP et analyse de texte',
      '  • Machine Learning et modèles prédictifs',
      '  • Visualisation avancée de données',
    ],
    roadmap: () => [
      'Roadmap ARGOS (4 semestres)',
      '',
      'S7 - Semestre 1:',
      '  • Ideation et définition du périmètre',
      '  • Architecture technique',
      '  • Prototypage des premiers modules',
      '',
      'S8 - Semestre 2:',
      '  • Développement des pipelines de données',
      '  • Implémentation des modèles ML',
      '  • Interface utilisateur v1',
      '',
      'S9 - Semestre 3:',
      '  • Optimisation et scalabilité',
      '  • Tests et validation',
      '  • Documentation complète',
      '',
      'S10 - Semestre 4:',
      '  • Déploiement et monitoring',
      '  • KPIs et métriques de performance',
      '  • Open source release',
    ],
    contact: () => [
      'Contact ARGOS',
      '',
      'GitHub:    https://github.com/argos-project',
      'Notion:    https://argos.notion.site',
      '',
      'Rejoindre le projet:',
      '  → Envoyez un email à: contact@argos-project.org',
      '  → Ou remplissez le formulaire sur notre Notion',
    ],
    clear: () => {
      setHistory([])
      return ['Terminal effacé.']
    },
  }

  // Messages de démarrage avec animation typewriter
  useEffect(() => {
    let isMounted = true
    const timeoutIds: number[] = []

    // Afficher le logo en premier
    const logoLines = getLogo()
    logoLines.forEach((line, index) => {
      const timeoutId = window.setTimeout(() => {
        if (isMounted) {
          setHistory((prev) => [
            ...prev,
            { type: 'system', content: line, timestamp: Date.now() },
          ])
        }
      }, index * 50) // Animation rapide ligne par ligne
      timeoutIds.push(timeoutId)
    })

    // Messages de boot après le logo
    const bootMessages = [
      { content: '', delay: logoLines.length * 50 + 200 }, // Ligne vide après le logo
      { content: 'Booting ARGOS predictive core...', delay: logoLines.length * 50 + 500 },
      { content: 'Loading public data streams...', delay: logoLines.length * 50 + 1000 },
      { content: 'Initializing AI models...', delay: logoLines.length * 50 + 1500 },
      { content: 'System ready. Type "help" for available commands.', delay: logoLines.length * 50 + 2000 },
    ]

    bootMessages.forEach((msg, index) => {
      const timeoutId = window.setTimeout(() => {
        if (isMounted && msg.content) {
          setHistory((prev) => [
            ...prev,
            { type: 'system', content: msg.content, timestamp: Date.now() },
          ])
        }
        if (isMounted && index === bootMessages.length - 1) {
          setIsTyping(false)
        }
      }, msg.delay)
      timeoutIds.push(timeoutId)
    })

    return () => {
      isMounted = false
      timeoutIds.forEach((id) => clearTimeout(id))
    }
  }, [])

  // Focus sur l'input au chargement
  useEffect(() => {
    if (!isTyping && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isTyping])

  // Scroll automatique vers le bas
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Gestion de la soumission de commande
  const handleCommand = (cmd: string) => {
    if (!cmd.trim()) return

    const [command, ...args] = cmd.trim().toLowerCase().split(' ')

    // Ajouter la commande à l'historique des commandes
    setCommandHistory((prev) => [...prev, cmd])
    setHistoryIndex(-1)

    // Ajouter la commande à l'historique
    setHistory((prev) => [
      ...prev,
      { type: 'command', content: `argos> ${cmd}`, timestamp: Date.now() },
    ])

    // Exécuter la commande
    const handler = commands[command]
    if (handler) {
      const output = handler(args)
      const outputLines = Array.isArray(output) ? output : [output]
      outputLines.forEach((line) => {
        // Ajouter chaque ligne de sortie
        setHistory((prev) => [
          ...prev,
          { type: 'output', content: line, timestamp: Date.now() },
        ])
      })
    } else {
      setHistory((prev) => [
        ...prev,
        {
          type: 'output',
          content: 'Commande inconnue. Tapez "help" pour la liste des commandes disponibles.',
          timestamp: Date.now(),
        },
      ])
    }

    setCurrentInput('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isTyping) {
      handleCommand(currentInput)
    }
  }

  const handleQuickCommand = (cmd: string) => {
    if (!isTyping) {
      handleCommand(cmd)
    }
  }

  // Navigation dans l'historique avec les flèches
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setCurrentInput('')
        } else {
          setHistoryIndex(newIndex)
          setCurrentInput(commandHistory[newIndex])
        }
      }
    }
  }

  // Rendu d'une ligne du terminal
  const renderLine = (line: TerminalLine, index: number) => {
    const isCommand = line.type === 'command'
    const isSystem = line.type === 'system'
    const colorClass = isCommand
      ? 'text-argos-neon'
      : isSystem
      ? 'text-argos-turquoise'
      : 'text-gray-300'

    // Gérer les lignes vides
    if (!line.content || line.content.trim() === '') {
      return <div key={index} className="h-1"></div>
    }

    return (
      <div 
        key={index} 
        className={`font-mono-terminal text-xs md:text-sm ${colorClass} break-words whitespace-pre animate-fadeIn`}
        style={{
          animation: 'fadeIn 0.3s ease-in',
        }}
      >
        {line.content}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Titre du terminal */}
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-argos-neon font-mono-terminal drop-shadow-[0_0_8px_rgba(96,245,194,0.5)]">
          ARGOS://terminal
        </h2>
        <div className="mt-2 h-0.5 w-24 mx-auto bg-gradient-to-r from-transparent via-argos-neon to-transparent opacity-50"></div>
      </div>

      {/* Terminal */}
      <div
        ref={terminalRef}
        className="bg-argos-dark-secondary border-2 border-argos-border rounded-lg p-4 md:p-6 h-80 md:h-96 overflow-y-auto font-mono-terminal transition-all duration-300"
        style={{
          boxShadow: '0 0 30px rgba(96, 245, 194, 0.15), inset 0 0 20px rgba(0, 0, 0, 0.3)',
          scrollBehavior: 'smooth',
        }}
      >
        {/* Historique */}
        <div className="space-y-1 mb-4">
          {history.map((line, index) => renderLine(line, index))}
        </div>

        {/* Ligne de commande */}
        {!isTyping && (
          <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
            <span className="text-argos-neon text-xs md:text-sm flex-shrink-0 font-semibold">argos&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-gray-200 font-mono-terminal text-xs md:text-sm placeholder-gray-600"
              placeholder="Tapez une commande..."
              autoFocus
            />
            <span className="text-argos-neon animate-blink text-xs md:text-sm">▊</span>
          </form>
        )}
      </div>

      {/* Boutons de commandes rapides */}
      {!isTyping && (
        <div className="mt-6 flex flex-wrap gap-2 justify-center px-2">
          {['help', 'logo', 'about', 'usecases', 'ethics', 'team', 'roadmap', 'contact', 'clear'].map(
            (cmd) => (
              <button
                key={cmd}
                onClick={() => handleQuickCommand(cmd)}
                className="px-3 py-1.5 md:px-4 md:py-2 bg-argos-dark-secondary border border-argos-border rounded text-argos-turquoise hover:bg-argos-border hover:border-argos-neon hover:text-argos-neon transition-all duration-300 hover:scale-105 active:scale-95 font-mono-terminal text-xs md:text-sm shadow-lg hover:shadow-argos-neon/20"
              >
                [{cmd}]
              </button>
            )
          )}
        </div>
      )}
    </div>
  )
}

export default Terminal
