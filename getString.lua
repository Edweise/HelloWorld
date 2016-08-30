--param a int number
--return a string 
--输入一个整数
--输出该整数从末尾开始每隔三位以逗号隔开的字符串
function getString(num)
	local str1,str2 = "",""
	local n = num
	while (n > 0) do
		local m = n % 1000
		n = math.floor( n / 1000 )
		str2 = tostring(m)
		if n > 0 then
			str2 = string.format(",".."%03d",m)
		end
		str1 = string.format("%s".."%s",str2,str1)
	end
	return str1
end
