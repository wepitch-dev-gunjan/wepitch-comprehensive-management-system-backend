const Voucher = require('../models/Voucher')

exports.createVoucher = async (req, res) => {
  try {
    const { expense, screen_shots, description } = req.body;

    console.log(expense, screen_shots)
    if (!expense || !screen_shots) {
      return res.status(400).send({ error: 'Expense and screen_shots are required fields' });
    }

    if (expense <= 0) {
      return res.status(400).send({ error: 'Expense must be a positive number' });
    }

    if (!Array.isArray(screen_shots) || screen_shots.length === 0) {
      return res.status(400).send({ error: 'Screen shots must be provided in an array' });
    }

    let voucher = new Voucher({
      expense,
      screen_shots,
      description: description ? description : ''
    })
    voucher = await voucher.save();

    res.status(200).send({
      message: 'Voucher created successfully',
      data: voucher
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

exports.getVoucher = async (req, res) => {
  try {
    const { voucher_id } = req.params;
    const voucher = await Voucher.findOne({ _id: voucher_id })
    if (!voucher) return res.status(404).send({
      error: 'Voucher not found'
    })

    res.status(200).send(voucher)
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

exports.getVouchers = async (req, res) => {
  try {
    let { expense_range, statuses, resolved_between, created_between } = req.query;
    const filters = {};

    if (expense_range) {
      try {
        expense_range = JSON.parse(expense_range);
        if (!Array.isArray(expense_range)) {
          throw new Error('Expense range must be an array');
        }
      } catch (err) {
        return res.status(400).send({ error: 'Invalid expense range format' });
      }
    }

    if (statuses) {
      try {
        statuses = JSON.parse(statuses);
        if (!Array.isArray(statuses)) {
          throw new Error('Statuses must be an array');
        }
      } catch (err) {
        return res.status(400).send({ error: 'Invalid statuses format' });
      }
    }

    // Expense Range Filter
    if (expense_range && Array.isArray(expense_range)) {
      if (expense_range.length === 1) {
        const expense = parseFloat(expense_range[0]);
        filters.expense = expense;
      } else if (expense_range.length === 2) {
        const [minExpense, maxExpense] = expense_range.map(parseFloat);
        filters.expense = {};
        if (!isNaN(minExpense)) filters.expense.$gte = minExpense;
        if (!isNaN(maxExpense)) filters.expense.$lte = maxExpense;
      }
    }

    // Statuses Filter
    if (statuses && Array.isArray(statuses) && statuses.length > 0) {
      filters.status = { $in: statuses };
    }

    // Parsing resolved_between
    if (resolved_between) {
      try {
        resolved_between = JSON.parse(resolved_between);
        if (!Array.isArray(resolved_between)) {
          throw new Error('Resolved between must be an array');
        }
      } catch (err) {
        return res.status(400).send({ error: 'Invalid resolved_between format' });
      }
    }

    // Parsing created_between
    if (created_between) {
      try {
        created_between = JSON.parse(created_between);
        if (!Array.isArray(created_between)) {
          throw new Error('Created between must be an array');
        }
      } catch (err) {
        return res.status(400).send({ error: 'Invalid created_between format' });
      }
    }

    // Resolved Between Filter
    if (resolved_between && Array.isArray(resolved_between)) {
      if (resolved_between.length === 1) {
        const resolved = new Date(parseFloat(resolved_between[0]));
        if (!isNaN(resolved.getTime())) {
          // Set time to 00:00:00 to match only the date part
          resolved.setHours(0, 0, 0, 0);
          filters.createdAt = created;
        }
      } else if (resolved_between.length === 2) {
        const [minResolved, maxResolved] = resolved_between;
        const minResolvedDate = new Date(minResolved);
        const maxResolvedDate = new Date(maxResolved);

        // Set times to start and end of the day to match only the date part
        if (!isNaN(minResolvedDate.getTime()) && !isNaN(maxResolvedDate.getTime())) {
          minResolvedDate.setHours(0, 0, 0, 0);
          maxResolvedDate.setHours(23, 59, 59, 999); // Set to end of the day
          filters.resolved_at = {
            $gte: minResolvedDate,
            $lte: maxResolvedDate,
          };
        }
      }
    }

    // Created Between Filter
    if (created_between && Array.isArray(created_between)) {
      if (created_between.length === 1) {
        const created = new Date(parseFloat(created_between[0]));
        if (!isNaN(created.getTime())) {
          // Set time to 00:00:00 to match only the date part
          created.setHours(0, 0, 0, 0);
          filters.createdAt = created;
        }
      } else if (created_between.length === 2) {
        const [minCreated, maxCreated] = created_between;
        const minCreatedDate = new Date(minCreated);
        const maxCreatedDate = new Date(maxCreated);

        // Set times to start and end of the day to match only the date part
        if (!isNaN(minCreatedDate.getTime()) && !isNaN(maxCreatedDate.getTime())) {
          minCreatedDate.setHours(0, 0, 0, 0);
          maxCreatedDate.setHours(23, 59, 59, 999); // Set to end of the day
          filters.createdAt = {
            $gte: minCreatedDate,
            $lte: maxCreatedDate,
          };
        }
      }
    }

    const vouchers = await Voucher.find(filters);

    if (!vouchers || vouchers.length === 0) {
      return res.status(404).send({ error: 'No vouchers found' });
    }

    res.status(200).send(vouchers);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

exports.editVoucher = async (req, res) => {
  try {

  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

exports.deleteVoucher = async (req, res) => {
  try {

  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};